<?php
function listAllJsonFiles($dir)
{
    // Check if the directory exists
    if (!is_dir($dir)) {
        return "The specified directory does not exist.";
    }

    // Scan the directory
    $files = scandir($dir);
    $fileList = [];

    // Iterate over each item in the directory
    foreach ($files as $file) {
        // Skip the current (.) and parent (..) directory entries
        if ($file !== '.' && $file !== '..') {
            // Get the file name and extension
            $fileInfo = pathinfo($file);
            $fileName = $fileInfo['filename'];
            $fileExtension = isset($fileInfo['extension']) ? $fileInfo['extension'] : '';

            if ($fileExtension == 'json') {
                // Add the file name and extension to the list
                $fileList[] = [
                    'name' => $fileName
                ];
            }
        }
    }

    return $fileList;
}