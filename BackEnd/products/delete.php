<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';


$data = json_decode(file_get_contents("php://input"));
// Validate data
if (!isset($data->productId)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}

try{
    $delete = $conn->prepare("DELETE FROM products WHERE id = :productId");
    $delete->bindParam(':productId',$data->productId);
    $delete->execute();
    if($delete->rowCount() > 0){
        http_response_code(200);
        echo json_encode(array("message"=>"Product Deleted Successfully"));
    }else{
        http_response_code(404);
        echo json_encode(array("message"=>'no product Belong This id' . $data->productId));
    }
}

    catch(PDOEXception $e){
        http_response_code(500);
        echo json_encode(array("message"=>"unbale delete"));
    }
?>