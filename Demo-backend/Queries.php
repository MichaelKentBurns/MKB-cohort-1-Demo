<?php

require_once 'connection.php';

class Queries
{
    private $conn;

    private $lastmvmt;

    public function __construct($databaseConnection)
    {
        $this->conn = $databaseConnection->getConnection();
    }

    public function insertSurvey($title)
    {
        $stmt = $this->conn->prepare("INSERT INTO Surveys (title) SELECT :title WHERE NOT EXISTS (SELECT * FROM Surveys WHERE title = :title)");
        $stmt->bindParam(':title', $title);
        $stmt->execute();

        if ($this->conn->lastInsertId() == 0) {
            return $this->conn->query("SELECT id FROM Surveys WHERE title = '$title'")->fetchColumn();
        } else {
            return $this->conn->lastInsertId();
        }
    }

    public function insertQuestion($survey_id, $question_text)
    {
        $stmt = $this->conn->prepare("INSERT INTO Questions (survey_id, question_text) VALUES (:survey_id, :question_text)");
        $stmt->bindParam(':survey_id', $survey_id);
        $stmt->bindParam(':question_text', $question_text);
        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function insertAnswer($survey_id, $question_id, $answer_text)
    {
        $stmt = $this->conn->prepare("INSERT INTO Answers (survey_id, question_id, answer_text) VALUES (:survey_id, :question_id, :answer_text)");
        $stmt->bindParam(':survey_id', $survey_id);
        $stmt->bindParam(':question_id', $question_id);
        $stmt->bindParam(':answer_text', $answer_text);
        $stmt->execute();
    }

    public function getSurveys()
    {
        $query = "
        SELECT 
            Surveys.id as survey_id, Surveys.title
        FROM Surveys";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getQuestions($survey_id)
    {
        $stmt = $this->conn->prepare("SELECT id as question_id, question_text FROM Questions WHERE survey_id = :survey_id");
        $stmt->bindParam(':survey_id', $survey_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAnswers($survey_id, $question_id)
    {
        $stmt = $this->conn->prepare("SELECT answer_text FROM Answers WHERE survey_id = :survey_id AND question_id = :question_id");
        $stmt->bindParam(':survey_id', $survey_id);
        $stmt->bindParam(':question_id', $question_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}