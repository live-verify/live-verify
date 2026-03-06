package main

import (
	"os"
	"testing"
)

func newTestStore(t *testing.T) *VaultStore {
	t.Helper()
	dir, err := os.MkdirTemp("", "vault-test-*")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.RemoveAll(dir) })

	store, err := NewVaultStore(dir)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { store.Close() })
	return store
}

const testHash = "09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031"

func TestGetNotFound(t *testing.T) {
	store := newTestStore(t)
	_, err := store.Get(testHash)
	if err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestPutAndGet(t *testing.T) {
	store := newTestStore(t)
	if err := store.SafePut(testHash, "OK"); err != nil {
		t.Fatal(err)
	}
	val, err := store.Get(testHash)
	if err != nil {
		t.Fatal(err)
	}
	if val != "OK" {
		t.Fatalf("expected OK, got %q", val)
	}
}

func TestIdempotentPut(t *testing.T) {
	store := newTestStore(t)
	if err := store.SafePut(testHash, "OK"); err != nil {
		t.Fatal(err)
	}
	if err := store.SafePut(testHash, "OK"); err != nil {
		t.Fatalf("idempotent put should succeed, got %v", err)
	}
}

func TestConflictPut(t *testing.T) {
	store := newTestStore(t)
	if err := store.SafePut(testHash, "OK"); err != nil {
		t.Fatal(err)
	}
	err := store.SafePut(testHash, "REVOKED")
	if err != ErrConflict {
		t.Fatalf("expected ErrConflict, got %v", err)
	}
}

func TestInvalidHash(t *testing.T) {
	store := newTestStore(t)
	cases := []string{
		"",
		"abc",
		"ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789", // uppercase
		"09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f03",  // 63 chars
		"09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f0310", // 65 chars
		"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",   // non-hex
	}
	for _, hash := range cases {
		_, err := store.Get(hash)
		if err != ErrInvalidHash {
			t.Errorf("Get(%q): expected ErrInvalidHash, got %v", hash, err)
		}
		err = store.SafePut(hash, "OK")
		if err != ErrInvalidHash {
			t.Errorf("SafePut(%q): expected ErrInvalidHash, got %v", hash, err)
		}
	}
}
