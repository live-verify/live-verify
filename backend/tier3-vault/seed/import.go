// Seed import tool: reads hashes from public/c/*/index.html and loads them into BadgerDB.
package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/phammant/verific/backend/tier3-vault/internal/store"
)

func main() {
	dbPath := flag.String("db-path", "/data/badger", "BadgerDB data directory")
	sourceDir := flag.String("source-dir", "../../public/c", "Directory containing hash subdirectories")
	flag.Parse()

	s, err := store.NewVaultStore(*dbPath)
	if err != nil {
		log.Fatalf("Failed to open store: %v", err)
	}
	defer s.Close()

	entries, err := os.ReadDir(*sourceDir)
	if err != nil {
		log.Fatalf("Failed to read source dir %s: %v", *sourceDir, err)
	}

	var imported, skipped, errCount int
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}
		hash := entry.Name()
		if hash == "verification-meta.json" {
			continue
		}

		indexPath := filepath.Join(*sourceDir, hash, "index.html")
		data, err := os.ReadFile(indexPath)
		if err != nil {
			log.Printf("SKIP %s: %v", hash, err)
			skipped++
			continue
		}
		payload := strings.TrimSpace(string(data))
		if payload == "" {
			log.Printf("SKIP %s: empty payload", hash)
			skipped++
			continue
		}

		if err := s.SafePut(hash, payload); err != nil {
			log.Printf("ERROR %s: %v", hash, err)
			errCount++
			continue
		}
		fmt.Printf("  imported %s -> %s\n", hash, payload)
		imported++
	}

	fmt.Printf("\nSeed complete: %d imported, %d skipped, %d errors\n", imported, skipped, errCount)
}
