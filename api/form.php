<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    $name = $data['name'];
    $mail = $data['mail'];
    $object = $data['object'];
    $message = $data['message'];

    if($name != '' && $mail != '' && $message != ''){

        $to = "contact.jhody.lagarde@gmail.com";
        $subject = "Message formulaire de : " . $name;

        $message = "
            <p> <strong> Nom: </strong>".$name."</p>
            <p> <strong> E-mail: </strong>".$mail."</p>
            <p> <strong> Objet du message: </strong> ".$object."</p>
            <p> <strong> Message: </strong> ".$message."</p>
        ";

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $headers .= 'From: <'.$mail.'>' . "\r\n";

        $send = mail($to,$subject,$message,$headers);

        if($send){

            $arr = array(
                "response" => true
            );

        }else {

            $arr = array(
                "response" => false
            );

        }

    }else {

        $arr = array(
            "response" => false
        );

    }

    echo json_encode($arr);
}

?>