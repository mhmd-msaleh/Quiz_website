<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$method = $_SERVER["REQUEST_METHOD"]; 
require_once("QuizDB.php");
$dataBase = new QuizDB(); 
if ($method === "GET"){
    $questions = $dataBase->getQuestions(); 
    $json = array(); 
    foreach ($questions as $value){
        array_push($json, array(
            "id" => $value["id"],
            "text" => $value["text"], 
            "choices" => array(
                "choice1" => $value["choice1"],
                "choice2" => $value["choice2"], 
                "choice3" => $value["choice3"], 
                "choice4" => $value["choice4"]
            )
        )); 
    }
    echo json_encode($json); 

}
elseif($method === "POST"){
    //we will suppose the the data is in POST
    
    $decodedJson = json_decode(file_get_contents('php://input'), true); 
    $answer = $dataBase->checkAnswer($decodedJson);
    // // print($answer); 
    echo(json_encode($answer)); 
    // var_dump($decodedJson); 
}
?>