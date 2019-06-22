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

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);

switch ($method) {
    case 'GET':
        try{
            $sql = 'SELECT * FROM user';
            $stmt = $dbh->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (PDOException $e) {
            echo 'Error: Table select!' . $e->getMessage();
            die();
        }
    case 'PUT':
        if((isset($input)&&!empty($input))){
            $id = $input["id"];
            $username = $input["username"];
            $password = $input["password"];
            $role = $input["role"];
            
            try{
                $sql = "UPDATE `user` SET `username` = '".$username."', `password` = '".$password."', `role` = '".$role."' WHERE user.id = ".$id;
                $stmt= $dbh->prepare($sql);
                $stmt->execute();
            }catch(PDOException $e) {
                echo $sql ."<br/>" . $e->getMessage();
            }
        }
        break; 
    
        
    case 'POST':
        $username = $input["username"];
        $password = $input["password"];
        $role = $input["role"];
        try {
            $sql = "INSERT INTO user (username,password,role)
		VALUES('$username', '$password', '$role')";
            $dbh->exec($sql);
        }catch(PDOException $e) {
            echo $sql ."<br/>" . $e->getMessage();
        }
        break;
    case 'DELETE':
        $id = $_GET['id'];
        try{
            $sql = "Delete From user WHERE id= :id";
            $stmt = $dbh->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        }catch(PDOException $e) {
            echo $sql ."<br/>" . $e->getMessage();
        }
        break;
}
