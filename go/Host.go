package main

import (
	"log"
)

//Host representa os dominios a serem seguidos pelo sistema
type Host struct {
	ID       int    `sql:"primary_key;auto_increment" json:"id"`
	name     string `sql:"size:80" json:"name"`
	protocol string `sql:"size:8;not null" json:"protocol"`
	domain   string `sql:"size:80;not null" json:"domain"`
	path     string `sql:"size:80;" json:"path"`
}

//NewHost cria um novo host
func NewHost(host Host) (int64, error) {
	db := connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Insert some data into table.
	sqlStatement, err := db.Prepare("INSERT INTO hosts(name, protocol, Domain,  path) VALUES ( ?, ?, ?, ? );")
	res, err := sqlStatement.Exec(&host.name, &host.protocol, &host.domain, &host.path)
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

	rows, err := db.Query("select * from hosts")
	if err != nil {
		log.Fatal(err)
		return
	}

	defer rows.Close()

	for rows.Next() {
		var host Host
		rows.Scan(&host.ID, &host.name, &host.protocol, &host.domain, &host.path)
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
	db.QueryRow("select * from hosts where id = ?", id).Scan(&host.ID, &host.name, &host.protocol, &host.domain, &host.path)
	return host
}

//DeleteHost deleta um host existente
func DeleteHost(id int64) (int64, error) {

	db := connect()
	defer db.Close()

	//Init transaction
	tx, _ := db.Begin()

	// Modify some data in table.
	sqlStatement, err := db.Prepare("DELETE FROM hosts WHERE name = ?")
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

// //UpdateHost atualiza apenas o host solicitado no ID
// func UpdateHost(host Host) (int64, error) {

// 	db := connect()
// 	defer db.Close()

// 	//Init transaction
// 	tx, _ := db.Begin()

// 	sqlStatement, _ := db.Prepare(`update hosts set
// 		name = ?,
// 		protocol = ?,
// 		domain = ?,
// 		path = ?,

// 		where id = ?`)

// 	res, err := sqlStatement.Exec(&host.name, &host.protocol, &host.domain, &host.path, &host.ID)

// 	if err != nil {
// 		tx.Rollback()
// 		log.Fatal(err)
// 		return 0, err
// 	}
// 	id, _ := res.LastInsertId()
// 	tx.Commit()

// 	return id, err
// }

// func CountHosts() (count int) {
// 	db := connect()
// 	defer db.Close()
// 	rows, _ := db.Query(`SELECT COUNT(*) AS count FROM hosts`)
// 	for rows.Next() {
// 		err := rows.Scan(&count)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 	}
// 	return count
// }
