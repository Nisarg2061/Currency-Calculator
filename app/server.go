package main

import (
	"fmt"
	"net/http"
)

func check(err error) {
  if err != nil {
    panic(err);
  }
}

func main() {
  pageServer := http.FileServer(http.Dir("./src"))
  http.Handle("/", pageServer);

  fmt.Println("Starting server at port 5088...")

  startServer := http.ListenAndServe(":5088", nil)

  check(startServer)
}
