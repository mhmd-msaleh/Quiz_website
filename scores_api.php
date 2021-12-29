<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
require_once("QuizDB.php");

$method = $_SERVER["REQUEST_METHOD"]; 
$dataBase = new QuizDB(); 
if($method === "GET"){
    $scores = $dataBase->getScores(); 
    echo json_encode($scores); 
}

elseif($method === "POST"){

    $decodedJson = json_decode(file_get_contents('php://input'), true); 
    $state = $dataBase->addScore($decodedJson); 
    echo json_encode($state);
    // var_dump($decodedJson);
}
?>