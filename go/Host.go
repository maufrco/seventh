package main

import (
	"fmt"
	"log"
	"time"
)

//Host representa os dominios a serem seguidos pelo sistema
type Host struct {
	id       int    `sql:"primary_key;auto_increment" json:"id"`
	name     string `sql:"size:80" json:"name"`
	protocol string `sql:"size:8;not null" json:"protocol"`
	domain   string `sql:"size:80;not null" json:"domain"`
	path     string `sql:"size:80;" json:"path"`
}

//NewHost cria um novo host
func NewHost(host Host) (int64, error) {
	db := connect()
	defer db.Close()
	fmt.Println(host.domain)
	//Init transaction
	tx, _ := db.Begin()

	// Insert some data into table.
	sqlStatement, err := db.Prepare("INSERT INTO Hosts(name, protocol, domain,  path, createdAt, updatedAt) VALUES ( ?, ?, ?, ?,?,? );")
	res, err := sqlStatement.Exec(&host.name, &host.protocol, &host.domain, &host.path, time.Now(), time.Now())
	if err != nil {
		tx.Rollback()
		log.Fatal(err)
		return 0, err
	}
	id, _ := res.LastInsertId()
	tx.Commit()

	return id, err
}

//GetHosts retorna todos os hosts do sistema
func GetHosts() (hosts []Host) {
	db := connect()
	defer db.Close()

	rows, err := db.Query(`SELECT id,name,protocol,domain,path FROM Hosts`)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Print(" -----------> ")
	fmt.Println(rows)
	fmt.Print(" <----------- ")

	defer rows.Close()

	for rows.Next() {
		var host Host
		rows.Scan(&host.id, &host.name, &host.protocol, &host.domain, &host.path)
		hosts = append(hosts, host)
	}

	return
}

//GetHostById retorna apenas o host solicitado no ID
func GetHostById(id int64) Host {
	db := connect()
	defer db.Close()
	var host Host

	//QueryRow retorna somente 1 linha
	db.QueryRow(`SELECT id,name,protocol,domain,path FROM Hosts WHERE id = ?`, id).Scan(&host.id, &host.name, &host.protocol, &host.domain, &host.path)
	return host
}

//DeleteHost deleta um host existente
func DeleteHost(id int64) (int64, error) {

	db := connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Modify some data in table.
	sqlStatement, err := db.Prepare(`DELETE FROM Hosts WHERE name = ?`)
	res, err := sqlStatement.Exec(id)

	if err != nil {
		tx.Rollback()
		log.Fatal(err)
		return 0, err
	}
	rowCount, err := res.RowsAffected()
	tx.Commit()

	return rowCount, err
}
func CountHosts() (count int) {
	db := connect()
	defer db.Close()
	rows, _ := db.Query(`SELECT COUNT(*) AS count FROM Hosts`)
	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			log.Fatal(err)
		}
	}
	return count
}
