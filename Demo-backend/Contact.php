<?php
require_once 'connection.php';
require_once 'Queries.php';
require_once 'DbHelper.php';

// Set header for JSON response and allow CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Get the JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON input");
    }

    $dbname = 'survey.db';
    $databaseConnection = new DatabaseConnection($dbname);
    $surveyDB = new SurveyDatabase($databaseConnection);
    $queries = new Queries($databaseConnection);
    $surveyDB->createTables();

    $queries->insertContact($data['name'], $data['email'], $data['contact_later'], $data['message']);
    // Close the database connection
    $databaseConnection->closeConnection();

    echo json_encode(['status' => 'success', 'message' => 'Contact saved successfully!']);

} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}