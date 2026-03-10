package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"
)

var hashPattern = regexp.MustCompile(`^[0-9a-f]{64}$`)

// rateLimiter implements a per-IP token bucket.
type rateLimiter struct {
	mu      sync.Mutex
	buckets map[string]*bucket
	rate    float64 // tokens per second
	burst   int
}

type bucket struct {
	tokens   float64
	lastTime time.Time
}

func newRateLimiter(perMinute int) *rateLimiter {
	return &rateLimiter{
		buckets: make(map[string]*bucket),
		rate:    float64(perMinute) / 60.0,
		burst:   perMinute,
	}
}

func (rl *rateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	b, ok := rl.buckets[ip]
	now := time.Now()
	if !ok {
		rl.buckets[ip] = &bucket{tokens: float64(rl.burst) - 1, lastTime: now}
		return true
	}

	elapsed := now.Sub(b.lastTime).Seconds()
	b.tokens += elapsed * rl.rate
	if b.tokens > float64(rl.burst) {
		b.tokens = float64(rl.burst)
	}
	b.lastTime = now

	if b.tokens < 1 {
		return false
	}
	b.tokens--
	return true
}

type edgeHandler struct {
	upstream   *http.Client
	upstreamURL string
	limiter    *rateLimiter
}

func newEdgeHandler(upstreamURL string, upstreamClient *http.Client, ratePerMin int) *edgeHandler {
	return &edgeHandler{
		upstream:    upstreamClient,
		upstreamURL: strings.TrimRight(upstreamURL, "/"),
		limiter:     newRateLimiter(ratePerMin),
	}
}

func newUpstreamClient(tlsCert, tlsKey, tlsCA string) (*http.Client, error) {
	if tlsCert == "" || tlsKey == "" {
		return http.DefaultClient, nil
	}

	cert, err := tls.LoadX509KeyPair(tlsCert, tlsKey)
	if err != nil {
		return nil, fmt.Errorf("load client cert: %w", err)
	}

	tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
		MinVersion:   tls.VersionTLS13,
	}

	if tlsCA != "" {
		caCert, err := os.ReadFile(tlsCA)
		if err != nil {
			return nil, fmt.Errorf("read CA cert: %w", err)
		}
		pool := x509.NewCertPool()
		pool.AppendCertsFromPEM(caCert)
		tlsConfig.RootCAs = pool
	}

	return &http.Client{
		Transport: &http.Transport{TLSClientConfig: tlsConfig},
		Timeout:   10 * time.Second,
	}, nil
}

func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.SplitN(xff, ",", 2)
		return strings.TrimSpace(parts[0])
	}
	// Strip port
	addr := r.RemoteAddr
	if idx := strings.LastIndex(addr, ":"); idx != -1 {
		return addr[:idx]
	}
	return addr
}

func (h *edgeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// CORS: specification requirement, not optional. Verification endpoints are
	// public, read-only, unauthenticated GETs. Browser-based renderers (e.g. the
	// <verified-cv> web component) make cross-origin fetches to verify claims.
	// Without this header, browser verification silently fails.
	// Server-side defenses (rate limiting, WAF, IP throttling) are unaffected.
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Health check
	if r.URL.Path == "/healthz" {
		if r.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		w.Write([]byte("ok"))
		return
	}

	// GET only
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("GET only"))
		return
	}

	// Rate limit
	ip := clientIP(r)
	if !h.limiter.allow(ip) {
		w.WriteHeader(http.StatusTooManyRequests)
		w.Write([]byte("rate limited"))
		return
	}

	// Extract last path segment as hash (path-agnostic)
	path := strings.TrimRight(r.URL.Path, "/")
	parts := strings.Split(path, "/")
	hash := parts[len(parts)-1]

	if !hashPattern.MatchString(hash) {
		http.Error(w, "invalid hash", http.StatusBadRequest)
		return
	}

	// Forward to Tier 2
	upReq, err := http.NewRequestWithContext(r.Context(), "GET", h.upstreamURL+"/v/"+hash, nil)
	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	resp, err := h.upstream.Do(upReq)
	if err != nil {
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Return Tier 2 response verbatim
	body, err := io.ReadAll(io.LimitReader(resp.Body, 8192))
	if err != nil {
		http.Error(w, "read error", http.StatusBadGateway)
		return
	}

	w.WriteHeader(resp.StatusCode)
	w.Write(body)
}
