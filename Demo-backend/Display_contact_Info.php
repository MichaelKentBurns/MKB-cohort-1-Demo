<?php
require_once 'connection.php';
require_once 'Queries.php';

// Set header for JSON response and allow CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

try {
    $dbname = 'survey.db';
    $databaseConnection = new DatabaseConnection($dbname);
    $queries = new Queries($databaseConnection);

    $contacts = $queries->getContactMessages();

    echo json_encode(['status' => 'success', 'contacts' => $contacts]);
} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}