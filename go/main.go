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

	_, err := db.Exec(`create table if not exists monitors (
		ID integer auto_increment,
		hostID integer NOT NULL,
		monitorDate timestamp NOT NULL,
		url varchar(80),
		statusCod integer,
		status  varchar(80),
		timeResponse integer,
		PRIMARY KEY (id))`)

	_, err = db.Exec(`create table if not exists hosts (
			ID integer auto_increment,
			name varchar(80),
			protocol varchar(8),
			domain  varchar(80),
			path  varchar(80),
			PRIMARY KEY (id))`)

	if err != nil {
		log.Fatal(err)
	}
	// mockHost(Host{name: "Seventh", protocol: "https://", domain: "www.seventh.com.br", path: "/"})
	// mockHost(Host{name: "Google", protocol: "https://", domain: "www.google.com.br", path: "/"})
	// mockHost(Host{name: "Amazon", protocol: "https://", domain: "www.amazon.com", path: "/pt"})
	// mockHost(Host{name: "AWS", protocol: "https://", domain: "aws.amazon.com", path: "/pt"})
	// mockHost(Host{name: "Microsoft", protocol: "https://", domain: "www.microsoft.com", path: "/pt-br"})
	// mockHost(Host{name: "Azure", protocol: "https://", domain: "azure.microsoft.com", path: "/pt-br"})
	// fmt.Println(CountHosts())
	for {
		fmt.Print("Exec")
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
	tp := createTransport()
	client := &http.Client{Transport: tp}
	response, err := client.Get(url)
	if err != nil {
		fmt.Println("Erro na requisicao GET: %s: %s:", err, url)
		metric = Metric{hostID: host.ID, monitorDate: time.Now(), url: url, statusCod: 0, status: "connection refuse", timeResponse: 0}
		NewMonitor(metric)
		return
	}
	defer response.Body.Close()

	metric = Metric{hostID: host.ID, monitorDate: time.Now(), url: url, statusCod: response.StatusCode, status: response.Status, timeResponse: int64(tp.Duration() / time.Millisecond)}
	NewMonitor(metric)

	return metric
}
