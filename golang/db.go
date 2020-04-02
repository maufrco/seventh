package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

//Connect serve a conexao do BD mysql
func connect() *sql.DB {

	err := godotenv.Load(path.Join(os.Getenv("HOME"), "/seventh/repositorio/seventh/golang/.env"))

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := os.Getenv("GOHOST")
	database := os.Getenv("GODATABASE")
	user := os.Getenv("GOUSER")
	password := os.Getenv("GOPASS")

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
