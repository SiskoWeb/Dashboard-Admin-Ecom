<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

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

            // Check if the account is active
        if ($user['isActive'] === false) {
            http_response_code(403); // 403 Forbidden - Indicates the server understood the request but refuses to authorize it.
            echo json_encode(array("message" => "Your account is not active yet.", "status" => 403));
        } 
      else{

          // Remove password from the user array
          unset($user['password']);
          http_response_code(200);
          echo json_encode(array("message" => "Login successful", "user" => $user, "status" => 200));
        }
  
        } 
     
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Email or password incorrect.", "status" => 401));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to login. " . $e->getMessage()));
}

// Close database connection
$conn = null;
?>
