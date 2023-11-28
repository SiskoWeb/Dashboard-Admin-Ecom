<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';



try{
    
$get = $conn->prepare('SELECT * FROM products');
$get->execute();

$products = $get->fetchAll(PDO::FETCH_ASSOC);

//MiddleWare To Add BaseUrl
 $baseUrl = 'http://localhost/adminDashboard/Backend/products'; // Replace with your actual base URL
 foreach ($products as &$products) {
     if (isset($category['image'])) {
         $products['image'] = $baseUrl . '/' . $products['image'];
     }
 }
http_response_code(200);
echo json_encode($products);

}catch(PDOException $e){
    http_response_code(500);
    echo json_encode(array("error"=>'unable to fecth products .'. $e->getMessage()));
}

// Close database connection
$conn = null;
?>