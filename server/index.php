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

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);
$method = $_SERVER['REQUEST_METHOD'];

if(isset ($_GET['id'])){
    $id = $_GET['id'];
    
    try{
        $sql = 'SELECT *FROM product WHERE id = :id';
        $stmt = $dbh->prepare($sql);
        $id = $id;
        $stmt->execute(['id' => $id]);
        $rows = $stmt->fetch();
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Error: Table select!' . $e->getMessage();
        die();
    }
} else {
    try{
        $sql = 'SELECT *FROM product';
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Error: Table select!' . $e->getMessage();
        die();
    }
    
}
switch ($method) {
    case 'PUT':
        $id = $_GET['id'];
        $title = $input["title"];
        $description = $input["description"];
        $image = $input["image"];
        //$image = "";
        $price = $input["price"];
        $date_created = $input["date_created"];
        
        try{
            $sql = "UPDATE `product` SET `title` = '".$title."', `description` = '".$description."', `price` = '".$price."', `image` = '".$image."', `date_created` = '".$date_created."' WHERE product.id = ".$id;
            $stmt= $dbh->prepare($sql);
            $stmt->execute();
        }catch(PDOException $e) {
            echo $sql ."<br/>" . $e->getMessage();
        }
        break;
        
    case 'POST':
        $title = $input["title"];
        $description = $input["description"];
        $image = $input["image"];
        //$image = "";
        $price = $input["price"];
        $date_created = $input["date_created"];
        try {
            $sql = "INSERT INTO product (title,description,price, image, date_created)
		VALUES('$title', '$description', '$price', '$image', '$date_created')";
            $dbh->exec($sql);
        }catch(PDOException $e) {
            echo $sql ."<br/>" . $e->getMessage();
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'];
        try{
            $sql = "Delete From product WHERE id= :id";
            $stmt = $dbh->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        }catch(PDOException $e) {
            echo $sql ."<br/>" . $e->getMessage();
        }
        break;
}
