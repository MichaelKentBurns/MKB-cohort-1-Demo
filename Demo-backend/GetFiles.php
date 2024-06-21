<?php
require_once 'Files.php';

// Set header for JSON response and allow CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins for simplicity
header('Access-Control-Allow-Methods: GET');

try {
    // Get the directory path
    $directory = '../Demo-JSON/surveys';
    // Get the list of files in the directory
    $files = listAllJsonFiles($directory);

    // Return the list of files as array
    echo json_encode($files);
} catch (Exception $e) {
    // Return an error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}