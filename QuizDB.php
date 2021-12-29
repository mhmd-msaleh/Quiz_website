<?php
class QuizDB{
    private $connection; 
    public function __construct(){
        $this->connection = mysqli_connect("localhost", "root", "", "quiz");
        if(mysqli_connect_error()){
            die(mysqli_connect_error()); 
        }
    }

    public function getQuestions(){
        $sql = "SELECT id, 
                        text,
                        choice1, 
                        choice2, 
                        choice3, 
                        choice4
                FROM question;";
        $table = mysqli_query($this->connection, $sql);
        $result = mysqli_fetch_all($table, MYSQLI_ASSOC); 
        // while ($r = mysqli_fetch_assoc($table)){
        //     array_push($result, $r); 
        // }    
        return $result;   
    }

    public function addQuestion($info){     //associativ array 
        $text = $info["text"];
        $choice1 = $info["choice1"];
        $choice2 = $info["choice2"];
        $choice3 = $info["choice3"];
        $choice4 = $info["choice4"];
        $answer = $info["answer_index"];
        $sql = "INSERT INTO question (text, choice1, choice2, choice3, choice4, answer_index)
        VALUES('$text', '$choice1', '$choice2', '$choice3', '$choice4', '$answer');";
        if(!mysqli_query($this->connection, $sql)){
            return FALSE; 
        }
        return TRUE; 
    }

    public function getScores(){
        $sql = "SELECT * FROM scores;"; 
        $table = mysqli_query($this->connection, $sql); 
        $result = mysqli_fetch_all($table, MYSQLI_ASSOC);
        return $result; 
    }

    public function checkAnswer($answer){
        $id = $answer["id"]; 
        $sql = "SELECT * FROM question WHERE id = '$id';"; 
        $query_result = mysqli_query($this->connection, $sql);
        $row = mysqli_fetch_assoc($query_result); 
        return (int)$answer["answer"] === (int)$row["answer_index"];
        
    }

    public function addScore($data){
        $user = $data["user"]; 
        $score = $data["score"]; 
        $sql = "INSERT INTO scores (user, score) VALUES('$user', '$score');";
        if(!mysqli_query($this->connection, $sql)){
            return FALSE; 
        }
        return TRUE; 
    }
}
?>