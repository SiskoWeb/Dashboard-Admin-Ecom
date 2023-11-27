<?php
// Enable CORS
include 'cors.php';
// Include database connection
include 'db.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate data (you may want to add more validation)
if (!isset($data->email) || !isset($data->password) || !isset($data->isActive) || !isset($data->role)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data.", "status" => 400));
    exit;
}

try {
   // Check If Email Already in Exist
$stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $data->email);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user !== false && $data->email === $user['email']) {
    http_response_code(201);
    echo json_encode(array("error" => "User Already Exist", "status" => 401));
} else {
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
        echo json_encode(array("message" => "User created successfully.", "status" => 201));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Unable to create user. " . $e->getMessage(), "status" => 500));
}

// Close database connection
$conn = null;
?>
