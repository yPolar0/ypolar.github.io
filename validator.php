function isValidKey($key) {
    $secretKey = '2kQn5nBp7GdFm0jvXZOIzYLCelWwRJhUH43iPE0T';
    return $key === $secretKey;
}

$key = $_GET['key'] ?? '';

$response = ['status' => 'Invalid'];
if (isValidKey($key)) {
    $response['status'] = 'Active';
}

header('Content-Type: application/json');
echo json_encode($response);
