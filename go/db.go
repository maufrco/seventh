package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path"

	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

//Connect serve a conexao do BD mysql
func connect() *sql.DB {

	err := godotenv.Load(path.Join(os.Getenv("HOME"), os.Getenv("GHOST")+".env"))

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := os.Getenv("GHOST")
	database := os.Getenv("GDB")
	user := os.Getenv("GUSER")
	password := os.Getenv("GPASS")

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
		log.Println("Erro na estabelecimento de conexão")
		log.Fatal(err)
		return nil
	}
	_, err = db.Exec(`create table if not exists Monitors (
		id integer auto_increment,
		hostId integer NOT NULL,
		monitorDate timestamp NOT NULL,
		url varchar(80),
		statusCod integer,
		status  varchar(80),
		timeResponse integer,
		createdAt timestamp NOT NULL,
		updatedAt timestamp NOT NULL,
		PRIMARY KEY (id))`)

	_, err = db.Exec(`create table if not exists Hosts (
			id integer auto_increment,
			name varchar(80),
			protocol varchar(8),
			domain  varchar(80),
			path  varchar(80),
			createdAt timestamp NOT NULL,
			updatedAt timestamp NOT NULL,
			PRIMARY KEY (id))`)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
