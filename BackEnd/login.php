<?php
// header('Content-Type: application/json');

// // Handle CORS
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');
// Enable CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Other headers to support the preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit();
}
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
            echo json_encode(array("message" => "Login successful", "user" => $user,"status"=>200));
        } else {
            http_response_code(200);
            echo json_encode(array("error" => "email or passowrd incorrect.","status"=>401));
        }
    } else {
        http_response_code(201);
        echo json_encode(array("error" => "Account not found.","status"=>401));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to login. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
