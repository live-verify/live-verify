package main

import (
	"crypto/tls"
	"crypto/x509"
	"flag"
	"log"
	"net/http"
	"os"
)

func main() {
	listen := flag.String("listen", ":8443", "Listen address")
	upstream := flag.String("upstream", "https://tier2:8080", "Tier 2 upstream URL")
	tlsCert := flag.String("tls-cert", "", "TLS certificate file (server)")
	tlsKey := flag.String("tls-key", "", "TLS private key file (server)")
	tlsCA := flag.String("tls-ca", "", "CA cert for upstream mTLS verification")
	upstreamCert := flag.String("upstream-cert", "", "Client cert for upstream mTLS")
	upstreamKey := flag.String("upstream-key", "", "Client key for upstream mTLS")
	rateLimit := flag.Int("rate-limit", 60, "Requests per minute per IP")
	flag.Parse()

	upstreamClient, err := newUpstreamClient(*upstreamCert, *upstreamKey, *tlsCA)
	if err != nil {
		log.Fatalf("Failed to create upstream client: %v", err)
	}

	handler := newEdgeHandler(*upstream, upstreamClient, *rateLimit)

	if *tlsCert == "" || *tlsKey == "" {
		log.Printf("Starting Tier 1 edge (plain HTTP) on %s -> %s", *listen, *upstream)
		log.Fatal(http.ListenAndServe(*listen, handler))
		return
	}

	tlsConfig := &tls.Config{
		MinVersion: tls.VersionTLS13,
	}
	if *tlsCA != "" {
		caCert, err := os.ReadFile(*tlsCA)
		if err != nil {
			log.Fatalf("Failed to read CA cert: %v", err)
		}
		pool := x509.NewCertPool()
		pool.AppendCertsFromPEM(caCert)
		tlsConfig.RootCAs = pool
	}

	server := &http.Server{
		Addr:      *listen,
		Handler:   handler,
		TLSConfig: tlsConfig,
	}
	log.Printf("Starting Tier 1 edge (HTTPS) on %s -> %s", *listen, *upstream)
	log.Fatal(server.ListenAndServeTLS(*tlsCert, *tlsKey))
}
