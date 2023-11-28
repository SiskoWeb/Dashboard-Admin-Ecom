<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';



try{
    
$get = $conn->prepare('SELECT id,name,image FROM categories');
$get->execute();

$categories = $get->fetchAll(PDO::FETCH_ASSOC);

//MiddleWare To Add BaseUrl
 $baseUrl = 'http://localhost/adminDashboard/Backend/categories'; // Replace with your actual base URL
 foreach ($categories as &$category) {
     if (isset($category['image'])) {
         $category['image'] = $baseUrl . '/' . $category['image'];
     }
 }
http_response_code(200);
echo json_encode($categories);

}catch(PDOException $e){
    http_response_code(500);
    echo json_encode(array("error"=>'unable to fecth categories .'. $e->getMessage()));
}

// Close database connection
$conn = null;
?>