<?php
include_once 'Book.php';

class Disk extends Book {
    private $size;

    public function __construct($sku, $name, $price, $value) {
        if (gettype($value)=="double"){
            parent::__construct($sku, $name, $price, $value);
        } else {
            $this->sku = $sku;
            $this->name = $name;
            $this->price = $price;
            $this->size = $value;
        }
    }

    public function getSaveQuery() {
        if ($this->size === null) {
            return parent::getSaveQuery();
        } else {
            return $sql = "INSERT INTO Products (sku, product_name, price, size)
            VALUES ('$this->sku', '$this->name', '$this->price', '$this->size')";
        }
        
    }
}
?>