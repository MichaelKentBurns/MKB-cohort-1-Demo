<?php

require_once 'connection.php';

class SurveyDatabase
{
    private $conn;

    public function __construct($databaseConnection)
    {
        $this->conn = $databaseConnection->getConnection();
    }

    public function createTables()
    {
        $createSurveysTable = "
        CREATE TABLE IF NOT EXISTS Surveys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        )";
        $this->conn->exec($createSurveysTable);

        $createQuestionsTable = "
        CREATE TABLE IF NOT EXISTS Questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            survey_id INTEGER NOT NULL,
            question_text TEXT NOT NULL,
            FOREIGN KEY (survey_id) REFERENCES Surveys(id)
        )";
        $this->conn->exec($createQuestionsTable);

        $createAnswersTable = "
        CREATE TABLE IF NOT EXISTS Answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            survey_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            answer_text TEXT NOT NULL,
            FOREIGN KEY (survey_id) REFERENCES Surveys(id),
            FOREIGN KEY (question_id) REFERENCES Questions(id)
        )";
        $this->conn->exec($createAnswersTable);

        $createAllUsersTables = "
        CREATE TABLE IF NOT EXISTS AllUsers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NULL,
            last_name TEXT NULL,
            email TEXT NOT NULL,
            survey_id INTEGER NOT NULL,
            FOREIGN KEY (survey_id) REFERENCES Surveys(id)
        )";
        $this->conn->exec($createAllUsersTables);
    }
}