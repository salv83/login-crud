<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");

/*CONN DB*/
$host = 'localhost';
$dbname='crud-login';
$user='root';
$pass='';

try{
    $dbh = new PDO ("mysql:host = $host;dbname=$dbname", $user,$pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch (PDOException $e){
    echo'Errore: No possible to connect to the database !' .$e->getMessage();
    die();
}

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);
$method = $_SERVER['REQUEST_METHOD'];

if($method=='POST') {
    $pieces = explode("&", $json);
    $p1= explode("=", $pieces[0]);
    $p2= explode("=", $pieces[1]);
    $username= $p1[1];
    $password= $p2[1];
    if (isset($username ) AND isset($password)) {
        try {
            $sql = "INSERT INTO user (username,password)
		VALUES('$username', '$password')";
            $dbh->exec($sql);
            $response["msg"] = "Registration Complete. Thank you";
            echo json_encode($response);
        }catch(PDOException $e) {
            $response["msg"] = "Registration Problem";
            $response["error"] = 1;
            echo json_encode($response);
            echo $sql ."<br/>" . $e->getMessage();
        }
    }else{
        $response["msg"] = "Wrong Fields";
        $response["error"] = 1;
        echo json_encode($response);
    }
}else{
    $response["msg"] = "Wrong Method";
    $response["error"] = 1;
    echo json_encode($response);
}







