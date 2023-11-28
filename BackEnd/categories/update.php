<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

if (!isset($_POST['categoryId']) || !isset($_POST['name'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'Incomplete data'));
    exit;
}

$categoryId = $_POST['categoryId'];
$name = $_POST['name'];

try {
    
    $updateQuery = 'UPDATE categories SET name = :name';
    $updateParams = array(':name' => $name);

    // Check if image is provided
    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];
     $imagePath = './upload/' . $image['name'];
    move_uploaded_file($image['tmp_name'], $imagePath);

        // if provided image from front update it it
        $updateQuery .= ', image = :image';
        $updateParams[':image'] = $imagePath;
    }

    
    $updateQuery .= ' WHERE id = :categoryId';
    $updateParams[':categoryId'] = $categoryId;

    $update = $conn->prepare($updateQuery);
    $update->execute($updateParams);



    http_response_code(200);
    echo json_encode(array("message" => "Category name updated successfully."));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to update category. " . $e->getMessage()));
}
?>
