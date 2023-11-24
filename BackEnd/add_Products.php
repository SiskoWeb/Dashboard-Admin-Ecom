<?php
require_once 'Database.php';


// $dbHost = "localhost";
// $dbName = "product_managment";
// $dbUser = "root";
// $dbPassword = "";

// Create Database instance
$database = new Database();

// zrray of products to be added
$productsToAdd = [
 
    [
        "name" => "Productd",
        "price" => 29.99,
        "description" => "Description 2",
        "image_url" => "https://picsum.photos/200",
        "category" => "electro",
        "quantity" => 50,
        "min_stock_quantity" => 5,
    ],
    [
        "name" => "Product 1",
        "price" => 19.99,
        "description" => "Description 1",
        "image_url" => "http://picsum.photos/200",
        "category" => "clothes",
        "quantity" => 9,
        "min_stock_quantity" => 10,
    ],
    [
        "name" => "Product 2",
        "price" => 29.99,
        "description" => "Description 2",
        "image_url" => "https://picsum.photos/200",
        "category" => "electro",
        "quantity" => 50,
        "min_stock_quantity" => 5,
    ],
    [
        "name" => "Product 1",
        "price" => 19.99,
        "description" => "Description 1",
        "image_url" => "https://picsum.photos/200",
        "category" => "clothes",
        "quantity" => 100,
        "min_stock_quantity" => 10,
    ],
    // Add more products as needed
];

// Prepare the SQL query
$query = "INSERT INTO products (name, price, description, image_url, category, quantity, min_stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)";



try {
    // Loop through each product and execute the query
    foreach ($productsToAdd as $product) {
        $params = [
            $product['name'],
            $product['price'],
            $product['description'],
            $product['image_url'],
            $product['category'],
            $product['quantity'],
            $product['min_stock_quantity']
        ];

        $database->executeQuery($query, $params);
    }


    echo "Products added successfully.";
} catch (Exception $e) {
    // Rollback the transaction if any query fails
    $database->executeQuery("ROLLBACK");
    die("Error adding products: " . $e->getMessage());
}
?>
