<?php

class DatabaseConnection
{
    private $conn;

    public function __construct($dbname)
    {
        $this->conn = new PDO("sqlite:" . $dbname);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnection()
    {
        return $this->conn;
    }

    public function closeConnection()
    {
        $this->conn = null;
    }
}
