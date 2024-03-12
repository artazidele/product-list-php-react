<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include_once './Database.php';
include_once './Furniture.php';

$sku = $_POST['sku'];
$product_name = $_POST['product_name'];
$price = floatval($_POST['price']);
$size = $_POST['size'];
$product_weight = floatval($_POST['product_weight']);
$dimensions = $_POST['heigth']."x".$_POST['width']."x".$_POST['length'];


$priceType = false;
if (filter_input(INPUT_POST, "price", FILTER_VALIDATE_FLOAT)
    || filter_input(INPUT_POST, "price", FILTER_VALIDATE_INT)) {
    $priceType = true;
}


$specialType = false;
$value = '';
if ($_POST['product_weight']!='') {
    $value = doubleval(strval($_POST['product_weight']));
    if (filter_input(INPUT_POST, "product_weight", FILTER_VALIDATE_FLOAT)
    || filter_input(INPUT_POST, "product_weight", FILTER_VALIDATE_INT)) {
        $specialType = true;
    }
} else if ($_POST['size']!='') {
    $value = intval(strval($_POST['size']));
    if (filter_input(INPUT_POST, "size", FILTER_VALIDATE_INT)) {
        $specialType = true;
    }
} else {
    $value = $dimensions;
    if (filter_input(INPUT_POST, "heigth", FILTER_VALIDATE_INT) 
    && filter_input(INPUT_POST, "width", FILTER_VALIDATE_INT)
    && filter_input(INPUT_POST, "length", FILTER_VALIDATE_INT)) {
        $specialType = true;
    }
}

$db = new Database();
if ($sku == '' || $product_name == '' || $price == ''|| $value =='') {
    echo "Please, submit required data";
} else if ($priceType === false || $specialType === false) {
    echo "Please, provide the data of indicated type";
} else if ($db->uniqueSKU($sku) == false) {
    echo "SKU must be unique";
} else {
    $product = new Furniture($sku, $product_name, $price, $value);
    $sql = $product->getSaveQuery();
    $db->saveProductToDatabase($sql);
}

?>