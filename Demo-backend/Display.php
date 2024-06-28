<?php
require_once 'connection.php';
require_once 'Queries.php';

// Set header for JSON response and allow CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins for simplicity
header('Access-Control-Allow-Methods: GET');

try {
    $dbname = 'survey.db';
    // Create a new connection to the database
    $databaseConnection = new DatabaseConnection($dbname);
    // Create a new Queries object
    $queries = new Queries($databaseConnection);

    // Get the list of surveys from the database
    $surveys = $queries->getSurveys();

    $formattedSurveys = [];

    foreach ($surveys as $survey) {
        $formattedQuestions = [];
        $questions = $queries->getQuestions($survey['survey_id']);

        foreach ($questions as $question) {
            $answers = $queries->getAnswers($survey['survey_id'], $question['question_id']);
            foreach ($answers as $answer) {
                $formattedQuestions[] = [
                    "question_text" => $question['question_text'],
                    "answer_text" => $answer['answer_text']
                ];
            }
        }

        // Add the formatted survey to the final array
        $formattedSurveys[] = [
            "title" => $survey['title'],
            "questions" => $formattedQuestions
        ];
    }
    echo json_encode(['status' => 'success', 'surveys' => $formattedSurveys]);
} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}


