<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->userId)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

try {
    // Prepare the SQL statement to delete the user
    $stmt = $conn->prepare("DELETE FROM users WHERE id = :userId");
    $stmt->bindParam(':userId', $data->userId);

 
    $stmt->execute();

    // Check if any rows were affected
    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(array("message" => "User deleted successfully."));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found." .$data->userId));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to delete user. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
