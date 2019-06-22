<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");

$host = 'localhost';
$dbname='crud-login';
$user='root';
$pass='';
try{
    $dbh = new PDO ("mysql:host = $host;dbname=$dbname", $user,$pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch (PDOException $e){
    echo'Error: Connection to the Database !' .$e->getMessage();
    die();
}

$method = $_SERVER['REQUEST_METHOD'];
$username=$_GET['username'];
$password=$_GET['password'];

if($method=='GET'){
    try{
        $sql = "SELECT * FROM user WHERE username = '".$username."' AND password = '".$password."'";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Error: Table select!' . $e->getMessage();
        die();
    }
}else{
    $response["msg"] = "Wrong method";
    $response["error"] = 1;
    echo json_encode($response);
}