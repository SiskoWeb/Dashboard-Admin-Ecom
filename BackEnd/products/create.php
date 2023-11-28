<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

// Validate data
if (
    !isset($_POST['name']) ||
    !isset($_FILES['image']) ||
    !isset($_POST['category_id']) ||
    !isset($_POST['quantity']) ||
    !isset($_POST['min_quantity']) ||
    !isset($_POST['price']) ||
    !isset($_POST['price_off']) ||
    !isset($_POST['description'])
) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

$name = $_POST['name'];
$category_id = $_POST['category_id'];
$quantity = $_POST['quantity'];
$min_quantity = $_POST['min_quantity'];
$price = $_POST['price'];
$price_off = $_POST['price_off'];
$description = $_POST['description'];
$image = $_FILES['image'];

try {
    // Handle image upload (save to a directory, database, etc.)
    $imagePath = './upload/' . $image['name'];
    move_uploaded_file($image['tmp_name'], $imagePath);

    // Insert data into the database
    $stmt = $conn->prepare('INSERT INTO products (name, image, category_id, quantity, min_quantity, price, price_off, description) VALUES (:name, :image, :category_id, :quantity, :min_quantity, :price, :price_off, :description)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $imagePath);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':quantity', $quantity);
    $stmt->bindParam(':min_quantity', $min_quantity);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':price_off', $price_off);
    $stmt->bindParam(':description', $description);
    $stmt->execute();

    http_response_code(201);
    echo json_encode(array("message" => "Product created successfully.", "status" => 201));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to create product. " . $e->getMessage()));
}
?>
