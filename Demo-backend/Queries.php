<?php

require_once 'connection.php';

class Queries
{
    private $conn;

    public function __construct($databaseConnection)
    {
        $this->conn = $databaseConnection->getConnection();
    }

    public function insertSurvey($title)
    {
        $stmt = $this->conn->prepare("INSERT INTO Surveys (title) VALUES (:title)");
        $stmt->bindParam(':title', $title);
        $stmt->execute();
        return $this->conn->lastInsertId();
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
            Surveys.id as survey_id, Surveys.title, 
            Questions.id as question_id, Questions.question_text, 
            Answers.answer_text 
        FROM Surveys
        LEFT JOIN Questions ON Surveys.id = Questions.survey_id
        LEFT JOIN Answers ON Questions.id = Answers.question_id
        ORDER BY Surveys.id, Questions.id";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}