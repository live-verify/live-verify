package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestEdgeRejectsNonGet(t *testing.T) {
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 60)

	for _, method := range []string{"POST", "PUT", "DELETE", "PATCH"} {
		req := httptest.NewRequest(method, "/c/09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031", nil)
		w := httptest.NewRecorder()
		h.ServeHTTP(w, req)
		if w.Code != http.StatusMethodNotAllowed {
			t.Errorf("%s: expected 405, got %d", method, w.Code)
		}
	}
}

func TestEdgeInvalidHash(t *testing.T) {
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 60)

	req := httptest.NewRequest("GET", "/c/badhash", nil)
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	if w.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestEdgeForwardsToUpstream(t *testing.T) {
	hash := "09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031"
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/v/"+hash {
			t.Errorf("unexpected upstream path: %s", r.URL.Path)
		}
		w.WriteHeader(200)
		w.Write([]byte(`{"status":"verified"}`))
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 60)

	req := httptest.NewRequest("GET", "/c/"+hash, nil)
	req.RemoteAddr = "1.2.3.4:1234"
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)

	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	if w.Body.String() != `{"status":"verified"}` {
		t.Fatalf(`expected {"status":"verified"}, got %q`, w.Body.String())
	}
	if w.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Fatal("missing CORS header")
	}
}

func TestEdgePathAgnostic(t *testing.T) {
	hash := "09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031"
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte(`{"status":"verified"}`))
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 60)

	// Different path prefixes should all work
	for _, path := range []string{"/c/" + hash, "/claims/" + hash, "/v/" + hash, "/" + hash} {
		req := httptest.NewRequest("GET", path, nil)
		req.RemoteAddr = "1.2.3.4:1234"
		w := httptest.NewRecorder()
		h.ServeHTTP(w, req)
		if w.Code != 200 {
			t.Errorf("path %s: expected 200, got %d", path, w.Code)
		}
	}
}

func TestEdge404FromUpstream(t *testing.T) {
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(404)
		w.Write([]byte("not found"))
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 60)
	hash := "09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031"

	req := httptest.NewRequest("GET", "/c/"+hash, nil)
	req.RemoteAddr = "1.2.3.4:1234"
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestEdgeRateLimit(t *testing.T) {
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte(`{"status":"verified"}`))
	}))
	defer upstream.Close()

	h := newEdgeHandler(upstream.URL, upstream.Client(), 5) // 5 per minute
	hash := "09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031"

	// Should allow first 5
	for i := 0; i < 5; i++ {
		req := httptest.NewRequest("GET", "/c/"+hash, nil)
		req.RemoteAddr = "10.0.0.1:1234"
		w := httptest.NewRecorder()
		h.ServeHTTP(w, req)
		if w.Code != 200 {
			t.Fatalf("request %d: expected 200, got %d", i, w.Code)
		}
	}

	// 6th should be rate limited
	req := httptest.NewRequest("GET", "/c/"+hash, nil)
	req.RemoteAddr = "10.0.0.1:1234"
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	if w.Code != 429 {
		t.Fatalf("expected 429, got %d", w.Code)
	}
}

func TestEdgeHealthz(t *testing.T) {
	h := newEdgeHandler("http://localhost:9999", http.DefaultClient, 60)
	req := httptest.NewRequest("GET", "/healthz", nil)
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}
