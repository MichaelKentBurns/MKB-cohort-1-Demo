<?php

require_once 'connection.php';
require_once 'DbHelper.php';
require_once 'Queries.php';

// Set header for JSON response and allow CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins for simplicity
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Get the JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON input");
    }

    // Database connection parameters
    $dbname = 'survey.db';

    // Create an instance of DatabaseConnection
    $databaseConnection = new DatabaseConnection($dbname);

    // Create an instance of SurveyDatabase
    $surveyDB = new SurveyDatabase($databaseConnection);

    // Create an instance of Queries
    $queries = new Queries($databaseConnection);

    // Create tables if they don't exist
    $surveyDB->createTables();

    // Insert survey title and get survey ID
    $survey_id = $queries->insertSurvey($data["title"]);

    // create variable to stock some user information only name and email from Answers form
    $usersInfo = array();


    // Insert questions and answers
    foreach ($data["answers"] as $question_text => $answer_text) {
        $question_id = $queries->insertQuestion($survey_id, $question_text);
        $queries->insertAnswer($survey_id, $question_id, $answer_text);

        if ($question_text === "What is your first name?" || $question_text === "What is your name?") {
            $usersInfo["name"] = $answer_text;
        } else if ($question_text === "What is your email?") {
            $usersInfo["email"] = $answer_text;
        }
    }

    // Insert user information if both name and email are captured
    if (isset($usersInfo["name"]) && isset($usersInfo["email"])) {
        $queries->insertUsersInfo($usersInfo["name"], $usersInfo["email"], $survey_id);
    } else {
        // Handle cases where either name or email is missing
        echo json_encode([
            'status' => 'error',
            'message' => 'Missing name or email information'
        ], 400);
    }

    // Close the database connection
    $databaseConnection->closeConnection();
    // Return a success response
    echo json_encode(['status' => 'success', 'message' => 'Survey results saved successfully!']);
} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
