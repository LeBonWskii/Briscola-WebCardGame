<?php

DEFINE('DB_HOST', 'mysql:host=localhost:3306;dbname=BriscolaDB;charset=utf8');
DEFINE('DB_USER', 'root');
DEFINE('DB_PASSWORD', '');

class DataBase
{
    private static $pdo; //oggetto PDO per la connessione al DB

    function __construct()
    {
        try {
            self::$pdo = new PDO(DB_HOST, DB_USER, DB_PASSWORD); //creo la connessione
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //setto gli attributi per la gestione degli errori
        } catch (PDOException $e) { //gestisco l'errore 
            die($e->getMessage()); //stampo il messaggio di errore e termino lo script 
        }
    }
    function __destruct()
    {
        self::$pdo = null; //chiudo la connessione al DB 
    }

    public function getPDO()
    {
        if (self::$pdo == null) { //se non esiste la connessione la creo 
            new DataBase();
        }
        return self::$pdo; //ritorno l'oggetto PDO 
    }
}

?>