<?php
header('Content-Type: application/json');

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
include 'db.php';

try {
    // Prepare the SQL statement to fetch users with the role "user"
    $stmt = $conn->prepare("SELECT id, email , isActive ,role FROM users WHERE role = 'user'");
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($users);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to fetch users. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
