<?php
include_once 'Product.php';

class Book extends Product {
    private $weigth;

    public function __construct($sku, $name, $price, $value) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->weigth = $value;
    }

    public function getSaveQuery() {
        return $sql = "INSERT INTO Products (sku, product_name, price, product_weight)
        VALUES ('$this->sku', '$this->name', '$this->price', '$this->weigth')";
    }
}
?>