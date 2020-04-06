package main

import (
	"fmt"
	"log"
	"time"
)

//Monitor struct que encapsula o result das metrics
type Monitor struct {
	Metric []*Metric `json:"results,omitempty"`
}

//Metric struct que traz os resultados da consulta ao host
type Metric struct {
	id           int       `json:"id,omitempty"`
	hostId       int       `json:"hostId,omitempty"`
	monitorDate  time.Time `json:"monitorDate,omitempty"`
	url          string    `json:"url,omitempty"`
	status       string    `json:"statusCod,omitempty"`
	statusCod    int       `json:"status,omitempty"`
	timeResponse int64     `json:"timeResponse,omitempty"`
}

//NewMonitor cria um novo host
func NewMonitor(metric Metric) int64 {
	db := connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Insert some data into table.
	sqlStatement, e := db.Prepare("INSERT INTO Monitors(hostId, monitorDate, url, statusCod, status, timeResponse,  createdAt, updatedAt) VALUES (?,?,?,?,?, ?, ?, ?);")
	if e != nil {
		log.Fatal(e)
		return 0
	}
	res, err := sqlStatement.Exec(&metric.hostId, &metric.monitorDate, &metric.url, &metric.statusCod, &metric.status, &metric.timeResponse, time.Now(), time.Now())
	fmt.Println(&metric)
	fmt.Println("ms:", metric.timeResponse)

	if err != nil {
		tx.Rollback()
		log.Fatal(err)
		return 0
	}
	id, _ := res.LastInsertId()
	tx.Commit()

	return id
}
