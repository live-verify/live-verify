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
	dbPath := flag.String("db-path", "/data/badger", "BadgerDB data directory")
	listen := flag.String("listen", ":9090", "Listen address")
	tlsCert := flag.String("tls-cert", "", "TLS certificate file")
	tlsKey := flag.String("tls-key", "", "TLS private key file")
	tlsCA := flag.String("tls-ca", "", "CA certificate for client verification (mTLS)")
	flag.Parse()

	store, err := NewVaultStore(*dbPath)
	if err != nil {
		log.Fatalf("Failed to open store: %v", err)
	}
	defer store.Close()

	mux := newMux(store)

	if *tlsCert == "" || *tlsKey == "" {
		log.Printf("Starting Tier 3 vault (plain HTTP) on %s", *listen)
		log.Fatal(http.ListenAndServe(*listen, mux))
		return
	}

	// mTLS setup
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
		tlsConfig.ClientCAs = pool
		tlsConfig.ClientAuth = tls.RequireAndVerifyClientCert
	}

	server := &http.Server{
		Addr:      *listen,
		Handler:   mux,
		TLSConfig: tlsConfig,
	}
	log.Printf("Starting Tier 3 vault (mTLS) on %s", *listen)
	log.Fatal(server.ListenAndServeTLS(*tlsCert, *tlsKey))
}
