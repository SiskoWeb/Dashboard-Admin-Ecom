<?php
header('Content-Type: application/json');

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
include 'db.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->userId) || !isset($data->isActive)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

try {
    // Prepare the SQL statement to update the user's isActive status
    $stmt = $conn->prepare("UPDATE users SET isActive = :isActive WHERE id = :userId");
    $stmt->bindParam(':isActive', $data->isActive, PDO::PARAM_BOOL);
    $stmt->bindParam(':userId', $data->userId);

    // Execute the statement
    $stmt->execute();

    http_response_code(200);
    echo json_encode(array("message" => "User isActive status updated successfully."));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to update user isActive status. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
