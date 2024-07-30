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
  PageServer := http.FileServer(http.Dir("./src"))
  http.Handle("/", PageServer);

  fmt.Println("Starting server at port 5088...")

  StartServer := http.ListenAndServe(":5088", nil)

  check(StartServer)
}
