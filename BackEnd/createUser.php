<?php
header('Content-Type: application/json');

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
include 'db.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate data (you may want to add more validation)
if (!isset($data->email) || !isset($data->password) || !isset($data->isActive) || !isset($data->role)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

try {
    // Hash the password
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO users (email, password, isActive, role) VALUES (:email, :password, :isActive, :role)");

    // Bind parameters
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':isActive', $data->isActive, PDO::PARAM_BOOL);
    $stmt->bindParam(':role', $data->role);

    // Execute the statement
    $stmt->execute();

    http_response_code(201);
    echo json_encode(array("message" => "User created successfully."));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to create user. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
