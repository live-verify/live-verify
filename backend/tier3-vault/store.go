package main

// Re-export store types for use within this package.
// The actual implementation lives in internal/store.

import "github.com/phammant/verific/backend/tier3-vault/internal/store"

type VaultStore = store.VaultStore

var (
	NewVaultStore = store.NewVaultStore
	ErrNotFound   = store.ErrNotFound
	ErrConflict   = store.ErrConflict
	ErrInvalidHash = store.ErrInvalidHash
)
