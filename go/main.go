package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	db := connect()
	defer db.Close()

	if CountHosts() <= 0 {
		mockHost(Host{name: "Seventh", protocol: "https://", domain: "www.seventh.com.br", path: "/"})
		mockHost(Host{name: "Google", protocol: "https://", domain: "www.google.com.br", path: "/"})
		mockHost(Host{name: "Amazon", protocol: "https://", domain: "www.amazon.com", path: "/"})
		mockHost(Host{name: "AWS", protocol: "https://", domain: "aws.amazon.com", path: "/pt"})
		mockHost(Host{name: "Microsoft", protocol: "https://", domain: "www.microsoft.com", path: "/pt-br"})
		mockHost(Host{name: "Azure", protocol: "https://", domain: "azure.microsoft.com", path: "/pt-br"})
	}

	for {
		fmt.Print("Iniciando execução ...")
		start()
		time.Sleep(time.Minute * 1)
	}
}

func mockHost(host Host) {
	id, e := NewHost(host)

	if e != nil {
		log.Fatal(e)
	}
	fmt.Print(id)
}
func start() {

	var hosts []Host

	hosts = GetHosts()

	c := make(chan Metric)
	for _, host := range hosts {
		go refer(tunnel(host), c)
	}

	for range hosts {
		fmt.Println(<-c)
	}

}
func tunnel(h Host) <-chan Metric {
	ch := make(chan Metric)
	go func() {
		ch <- check(h)
	}()
	return ch
}
func refer(origem <-chan Metric, destino chan Metric) {
	for {
		destino <- <-origem
	}
}
func check(host Host) (metric Metric) {
	url := host.protocol + host.domain + host.path
	//fmt.Printf(url)
	tp := createTransport()
	client := &http.Client{Transport: tp}
	response, err := client.Get(url)
	if err != nil {
		fmt.Println("Error na requisicao GET: %s: %s:", err, url)
		metric = Metric{hostId: host.id, monitorDate: time.Now(), url: url, statusCod: 0, status: "connection refuse", timeResponse: 0}
		NewMonitor(metric)
		return
	}
	defer response.Body.Close()

	metric = Metric{hostId: host.id, monitorDate: time.Now(), url: url, statusCod: response.StatusCode, status: response.Status, timeResponse: int64(tp.Duration() / time.Millisecond)}
	NewMonitor(metric)

	return metric
}
