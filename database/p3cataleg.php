<?php
// Habilitar CORS para permitir peticiones desde el frontend
header("Access-Control-Allow-Origin: *");

// header('Access-Control-Allow-Origin: *');
$q = json_decode(file_get_contents('php://input'), true);
  if ($q){
    $data = [];
    // Genera la query
    $query = "SELECT * FROM productes WHERE (";
    foreach ($q as $k=>$v) {
       foreach ($v as $i=>$j){
        if ($i<count($v)-1){
          $query .= " ".$k."= ? or ";
        }else {
          $query .= " ".$k."= ?)";
        }
        $data[]=$j;
      }
        $query .= " and (";
    }
    $sql = substr($query, 0, -6);
  }else {
    $sql = "SELECT * FROM productes";
  }
  
  try {
    $dbh = new PDO('mysql:host=localhost; dbname=cataleg; charset=utf8','root', 'T51ntC_Xale01');
    $sth = $dbh->prepare($sql);
    $sth->execute($data);
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
  } catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  }
  $res = json_encode($result);
  echo $res;
