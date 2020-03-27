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
	ID           int64         `json:"id,omitempty"`
	hostId       int64         `json:"hostId,omitempty"`
	monitorDate  time.Time     `json:"monitorDate,omitempty"`
	url          string        `json:"url,omitempty"`
	status       string        `json:"statusCod,omitempty"`
	statusCod    int           `json:"status,omitempty"`
	timeResponse time.Duration `json:"timeResponse,omitempty"`
	created_at   time.Time     `json:"created_at,omitempty"`
	updated_at   time.Time     `json:"updated_at,omitempty"`
}

//Metadata detalhes da consulta
type Metadata struct {
	TotalCount int32 `json:"total_count,omitempty"`
}

//NewMonitor cria um novo host
func NewMonitor(metric Metric) int64 {
	db := Connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Insert some data into table.
	sqlStatement, err := db.Prepare("INSERT INTO monitors(hostId, monitorDate, url, statusCod, status, timeResponse) VALUES (?,?,?, ?, ?, ?);")
	res, err := sqlStatement.Exec(&metric.hostId, &metric.monitorDate, &metric.url, &metric.statusCod, &metric.status, &metric.timeResponse)
	fmt.Println(res)

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
func CountMonitor() (count int) {
	db := Connect()
	defer db.Close()
	rows, _ := db.Query(`SELECT COUNT(*) AS count FROM monitors`)
	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			log.Fatal(err)
		}
	}
	return count
}
