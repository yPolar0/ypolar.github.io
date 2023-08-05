<?php

function isValidKey($key) {
    $secretKey = 'test';
    return $key === $secretKey;
}

$key = $_GET['key'] ?? '';

$response = ['status' => 'Invalid'];
if (isValidKey($key)) {
    $response['status'] = 'Active';
}

header('Content-Type: application/json');
echo json_encode($response);
