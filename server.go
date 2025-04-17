package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join("app", r.URL.Path)

		// Check if the file exists
		info, err := os.Stat(path)
		if err == nil && !info.IsDir() {
			// File exists, serve it
			http.ServeFile(w, r, path)
			return
		}

		// Otherwise, serve index.html for client-side routing
		http.ServeFile(w, r, "app/index.html")
	})

	fmt.Println("Server running on http://localhost:8082")
	http.ListenAndServe(":8082", nil)
}
