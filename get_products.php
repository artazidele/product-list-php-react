<?php
include_once './Database.php';

header("Access-Control-Allow-Origin: *");

$db = new Database();
$db->getProducts();

?>