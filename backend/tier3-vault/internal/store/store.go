package store

import (
	"bytes"
	"encoding/hex"
	"errors"
	"fmt"
	"regexp"

	"github.com/dgraph-io/badger/v4"
)

var (
	ErrNotFound    = errors.New("not found")
	ErrConflict    = errors.New("conflict: key exists with different payload")
	ErrInvalidHash = errors.New("invalid hash: must be 64 lowercase hex characters")

	hashPattern = regexp.MustCompile(`^[0-9a-f]{64}$`)
)

// VaultStore wraps BadgerDB for hash-payload storage.
// Keys are stored as 32-byte binary (decoded from hex) to halve key storage.
type VaultStore struct {
	db *badger.DB
}

func NewVaultStore(dbPath string) (*VaultStore, error) {
	opts := badger.DefaultOptions(dbPath).
		WithLogger(nil)
	db, err := badger.Open(opts)
	if err != nil {
		return nil, fmt.Errorf("open badger: %w", err)
	}
	return &VaultStore{db: db}, nil
}

func (s *VaultStore) Close() error {
	return s.db.Close()
}

func ValidateHash(hash string) error {
	if !hashPattern.MatchString(hash) {
		return ErrInvalidHash
	}
	return nil
}

func hashToKey(hash string) ([]byte, error) {
	return hex.DecodeString(hash)
}

// Get returns the payload for a hash, or ErrNotFound.
func (s *VaultStore) Get(hash string) (string, error) {
	if err := ValidateHash(hash); err != nil {
		return "", err
	}
	key, err := hashToKey(hash)
	if err != nil {
		return "", ErrInvalidHash
	}

	var val []byte
	err = s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(key)
		if err == badger.ErrKeyNotFound {
			return ErrNotFound
		}
		if err != nil {
			return err
		}
		val, err = item.ValueCopy(nil)
		return err
	})
	if err != nil {
		return "", err
	}
	return string(val), nil
}

// SafePut is idempotent: same key+value succeeds, same key+different value returns ErrConflict.
func (s *VaultStore) SafePut(hash string, payload string) error {
	if err := ValidateHash(hash); err != nil {
		return err
	}
	key, err := hashToKey(hash)
	if err != nil {
		return ErrInvalidHash
	}
	val := []byte(payload)

	return s.db.Update(func(txn *badger.Txn) error {
		item, err := txn.Get(key)
		if err == nil {
			existing, err := item.ValueCopy(nil)
			if err != nil {
				return err
			}
			if bytes.Equal(existing, val) {
				return nil // Idempotent success
			}
			return ErrConflict
		}
		if err != badger.ErrKeyNotFound {
			return err
		}
		return txn.Set(key, val)
	})
}
