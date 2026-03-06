package main

import (
	"io"
	"net/http"
	"strings"
)

func newMux(store *VaultStore) *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("GET /v/{hash}", func(w http.ResponseWriter, r *http.Request) {
		hash := r.PathValue("hash")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		val, err := store.Get(hash)
		if err == ErrNotFound {
			http.NotFound(w, r)
			return
		}
		if err == ErrInvalidHash {
			http.Error(w, "invalid hash", http.StatusBadRequest)
			return
		}
		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(val))
	})

	mux.HandleFunc("PUT /v/{hash}", func(w http.ResponseWriter, r *http.Request) {
		hash := r.PathValue("hash")

		body, err := io.ReadAll(io.LimitReader(r.Body, 8192+1))
		if err != nil {
			http.Error(w, "read error", http.StatusBadRequest)
			return
		}
		payload := strings.TrimSpace(string(body))
		if len(payload) == 0 {
			http.Error(w, "empty payload", http.StatusBadRequest)
			return
		}
		if len(body) > 8192 {
			http.Error(w, "payload too large", http.StatusRequestEntityTooLarge)
			return
		}

		err = store.SafePut(hash, payload)
		if err == ErrInvalidHash {
			http.Error(w, "invalid hash", http.StatusBadRequest)
			return
		}
		if err == ErrConflict {
			http.Error(w, err.Error(), http.StatusConflict)
			return
		}
		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("stored"))
	})

	return mux
}
