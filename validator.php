<?php
header('Content-Type: application/json');

function isValidKey($key) {
    $secretKey = '2kQn5nBp7GdFm0jvXZOIzYLCelWwRJhUH43iPE0T';
    return $key === $secretKey;
}

$key = $_GET['key'] ?? '';
$response = ['status' => 'Invalid'];

if (strlen($key) === 40 && ctype_alnum($key) && isValidKey($key)) {
    $response['status'] = 'Active';
}

echo json_encode($response);
?>
