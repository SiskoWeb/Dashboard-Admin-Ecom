<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

if (!isset($_POST['productId'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'Incomplete data'));
    exit;
}

$productId = $_POST['productId'];
$updateParams = array();

// Check if 'name' is provided
if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $updateQuery = 'UPDATE products SET name = :name';
    $updateParams[':name'] = $name;
}

// Check if 'image' is provided
if (isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $imagePath = './upload/' . $image['name'];
    move_uploaded_file($image['tmp_name'], $imagePath);

    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', image = :image';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET image = :image';
    }

    $updateParams[':image'] = $imagePath;
}


// Check if 'price' is provided
if (isset($_POST['image'])) {
    $price = $_POST['price'];
    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', price = :price';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET price = :price';
    }

    $updateParams[':price'] = $price;
}


// Check if 'price' is provided
if (isset($_POST['category'])) {
    $category = $_POST['category'];
    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', category = :category';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET category = :category';
    }

    $updateParams[':category'] = $category;
}

// Check if 'price' is provided
if (isset($_POST['min_quantity'])) {
    $min_quantity = $_POST['min_quantity'];
    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', min_quantity = :min_quantity';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET min_quantity = :min_quantity';
    }

    $updateParams[':min_quantity'] = $min_quantity;
}

// Check if 'price' is provided
if (isset($_POST['price_off'])) {
    $price_off = $_POST['price_off'];
    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', price_off = :price_off';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET price_off = :price_off';
    }

    $updateParams[':price_off'] = $price_off;
}

// Check if 'price' is provided
if (isset($_POST['description'])) {
    $description = $_POST['description'];
    if (isset($updateQuery)) {
        // If 'name' is provided, add a comma before 'image'
        $updateQuery .= ', description = :description';
    } else {
        // If 'name' is not provided, start the query with 'image'
        $updateQuery = 'UPDATE products SET description = :description';
    }

    $updateParams[':description'] = $description;
}


// Check if any updates are specified
if (!isset($updateQuery)) {
    http_response_code(400);
    echo json_encode(array('message' => 'No updates provided.'));
    exit;
}

$updateQuery .= ' WHERE id = :productId';
$updateParams[':productId'] = $productId;

try {
    $update = $conn->prepare($updateQuery);
    $update->execute($updateParams);

    http_response_code(200);
    echo json_encode(array("message" => "Product updated successfully."));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to update product. " . $e->getMessage()));
}
?>
