<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

// Validate data
if (!isset($_POST['name']) || !isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

$name = $_POST['name'];
$image = $_FILES['image'];

try {
    // 1}hanndle image from front to store it in folder
    // 2}get path and save it in db 
    $imagePath = './upload/' . $image['name'];
    move_uploaded_file($image['tmp_name'], $imagePath);

    // Insert data into the database
    $stmt = $conn->prepare('INSERT INTO categories (name, image) VALUES (:name, :image)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $imagePath);
    $stmt->execute();

    http_response_code(201);
    echo json_encode(array("message" => "Category created successfully.", "status" => 201));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to create category. " . $e->getMessage()));
}
?>
