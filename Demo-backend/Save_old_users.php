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
    $dbname = 'survey.db';
    $databaseConnection = new DatabaseConnection($dbname);
    $queries = new Queries($databaseConnection);

    foreach ($data as $info) {
        $queries->insertUsersInfo($info['name'], $info['email'], $info['survey_id']);
    }
    $databaseConnection->closeConnection();

    echo json_encode(['status' => 'success', 'message' => 'Users saved successfully!']);

} catch (Exception $e) {
    return json_encode(array("error" => $e->getMessage()));
}


