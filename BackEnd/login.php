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

// Validate data
if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

try {
    // Prepare the SQL statement to fetch user data by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verify the password
        if (password_verify($data->password, $user['password'])) {
            // Remove sensitive data from the user array
            unset($user['password']);

            http_response_code(200);
            echo json_encode(array("message" => "Login successful", "user" => $user));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Incorrect password."));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Account not found."));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to login. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
