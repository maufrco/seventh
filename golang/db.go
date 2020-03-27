package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

const (
	host     = "127.0.0.1"
	database = "seventh"
	user     = "root"
	password = "mau29682"
)

//Connect serve a conexao do BD mysql
func Connect() *sql.DB {
	//fmt.Printf("connetcing")
	var connectionString = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?allowNativePasswords=true", user, password, host, database)

	// Initialize connection object.
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Println("Erro na conexão do banco de dados")
		os.Exit(1)
	}
	//fmt.Printf("conectou")
	_, err = db.Exec("CREATE DATABASE if not exists seventh")
	_, err = db.Exec("USE seventh")

	err = db.Ping()
	if err != nil {
		log.Println("Erro na esttabelecimento de conexão")
		log.Fatal(err)
		return nil
	}
	//fmt.Printf("pingou")
	return db
}
