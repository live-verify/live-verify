package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func setupTestServer(t *testing.T) (*http.ServeMux, *VaultStore) {
	t.Helper()
	store := newTestStore(t)
	mux := newMux(store)
	return mux, store
}

func TestHealthz(t *testing.T) {
	mux, _ := setupTestServer(t)
	req := httptest.NewRequest("GET", "/healthz", nil)
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}

func TestGetNotFoundHTTP(t *testing.T) {
	mux, _ := setupTestServer(t)
	req := httptest.NewRequest("GET", "/v/"+testHash, nil)
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestPutAndGetHTTP(t *testing.T) {
	mux, _ := setupTestServer(t)

	// PUT
	req := httptest.NewRequest("PUT", "/v/"+testHash, strings.NewReader(`{"status":"verified"}`))
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Fatalf("PUT: expected 200, got %d: %s", w.Code, w.Body.String())
	}

	// GET
	req = httptest.NewRequest("GET", "/v/"+testHash, nil)
	w = httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Fatalf("GET: expected 200, got %d", w.Code)
	}
	if w.Body.String() != `{"status":"verified"}` {
		t.Fatalf(`expected {"status":"verified"}, got %q`, w.Body.String())
	}
	if w.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Fatal("missing CORS header")
	}
}

func TestPutConflictHTTP(t *testing.T) {
	mux, _ := setupTestServer(t)

	req := httptest.NewRequest("PUT", "/v/"+testHash, strings.NewReader(`{"status":"verified"}`))
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Fatalf("first PUT: expected 200, got %d", w.Code)
	}

	req = httptest.NewRequest("PUT", "/v/"+testHash, strings.NewReader(`{"status":"revoked"}`))
	w = httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 409 {
		t.Fatalf("conflict PUT: expected 409, got %d", w.Code)
	}
}

func TestPutInvalidHashHTTP(t *testing.T) {
	mux, _ := setupTestServer(t)
	req := httptest.NewRequest("PUT", "/v/badhash", strings.NewReader(`{"status":"verified"}`))
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestPutEmptyPayload(t *testing.T) {
	mux, _ := setupTestServer(t)
	req := httptest.NewRequest("PUT", "/v/"+testHash, strings.NewReader(""))
	w := httptest.NewRecorder()
	mux.ServeHTTP(w, req)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}
