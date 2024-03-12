<?php
include_once './Database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db = new Database();
$db->deleteProducts($_POST['deleteId']);

?>