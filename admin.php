<?php

$method = $_SERVER["REQUEST_METHOD"];
require_once("QuizDB.php");
if($method === "GET"){
    $json= '
        <form method="POST" action="admin.php">
            <label>Question TEXT: </label><input type="text" name="text"><br>
            <label>Choice1: </label><input type="text" name="choice1"><br>
            <label>Choice2: </label><input type="text" name="choice2"><br>
            <label>Choice3: </label><input type="text" name="choice3"><br>
            <label>Choice4: </label><input type="text" name="choice4"><br>
            <label>Answer index: </label><input type="text" name="answer-index" value="1"><br>
            <button name="submit" class="btn">Submit</button>
        </form>
    ';
    echo($json);  
}
elseif($method === "POST"){
    // var_dump($_POST);
    // $text = 
    // $choice1 = $_POST["choice1"]; 
    // $choice2 = ; 
    
    // $answer = ; 
    
    $dataBase = new QuizDB(); 
    if ($dataBase->addQuestion(array(
        "text" => $_POST["text"],
        "choice1" => $_POST["choice1"], 
        "choice2" => $_POST["choice2"],
        "choice3" => $_POST["choice3"], 
        "choice4" => $_POST["choice4"], 
        "answer_index" => $_POST["answer-index"]
    ))){
        $response = '<h1>Successful</h1>'; 
    } 
    else{
        $response = '<h1>unsuccessful</h1>';
    }
    echo($response); 

}

?> 