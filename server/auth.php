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
$pieces = explode("&", $json);
$p1= explode("=", $pieces[0]);
$p2= explode("=", $pieces[1]);

$username= $p1[1];
$password= $p2[1];

if (isset($username ) AND isset($password)) {
    try{
        $sql = 'SELECT * from user WHERE username = :username AND password = :password';
        $stmt = $dbh->prepare($sql);
        $stmt->execute(array('username' => $username, 'password' => $password));
        $stmt->execute();
        $rows = $stmt->fetch();
        $num_rows = $stmt->rowCount();

    } catch (PDOException $e) {
        echo 'Error select table !' . $e->getMessage();
        die();
    }
    if ($num_rows == 1) {
        if (is_array($rows) && isset($rows['role'])) {
            if($rows['role']=='1'){
                $response["msg"] = "success - administrator";
            }else{
                $response["msg"] = "success";
            }
        }

        echo json_encode($response);
    }else {
        $response["msg"] = "Wrong Login Data";
        $response["error"] = 1;
        echo json_encode($response);
    }
}