package main

import (
	"fmt"
	"log"
	"time"
)

//Monitor struct que encapsula o result das metrics
type Monitor struct {
	Metric   []*Metric `json:"results,omitempty"`
	Metadata *Metadata `json:"metadata,omitempty"`
}

//Metric struct que traz os resultados da consulta ao host
type Metric struct {
	ID           int       `json:"id,omitempty"`
	hostID       int       `json:"hostID,omitempty"`
	monitorDate  time.Time `json:"monitorDate,omitempty"`
	url          string    `json:"url,omitempty"`
	status       string    `json:"statusCod,omitempty"`
	statusCod    int       `json:"status,omitempty"`
	timeResponse int64     `json:"timeResponse,omitempty"`
}

//Metadata detalhes da consulta
type Metadata struct {
	TotalCount int32 `json:"total_count,omitempty"`
}

//NewMonitor cria um novo host
func NewMonitor(metric Metric) int64 {
	db := connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Insert some data into table.
	sqlStatement, e := db.Prepare("INSERT INTO monitors(hostID, monitorDate, url, statusCod, status, timeResponse) VALUES (?,?,?, ?, ?, ?);")
	if e != nil {
		log.Fatal(e)
		return 0
	}
	res, err := sqlStatement.Exec(&metric.hostID, &metric.monitorDate, &metric.url, &metric.statusCod, &metric.status, &metric.timeResponse)

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

// CountMonitor retorna o total de registro
// func CountMonitor() (count int) {
// 	db := connect()
// 	defer db.Close()
// 	rows, _ := db.Query(`SELECT COUNT(*) AS count FROM monitors`)
// 	for rows.Next() {
// 		err := rows.Scan(&count)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 	}
// 	return count
// }
