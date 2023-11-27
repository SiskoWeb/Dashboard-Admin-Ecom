<?php
// Enable CORS
include './../cors.php';
// Include database connection
include './../db.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->categoryId)) {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
    exit;
}


try{
    $delete = $conn->prepare("DELETE FROM categories WHERE id = :categoryId");
    $delete->bindParam(':categoryId',$data->categoryId);
    $delete->execute();
    if($delete->rowCount() > 0){
        http_response_code(200);
        echo json_encode(array("message"=>"category Deleted Successfully"));
    }else{
        http_response_code(404);
        echo json_encode(array("message"=>'no Category Belong This id' . $data->categoryId));
    }
}

    catch(PDOEXception $e){
        http_response_code(500);
        echo json_encode(array("message"=>"unbale delete"));
    }




?>