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

    // Return the list of surveys as array
    echo json_encode($surveys);
} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}


