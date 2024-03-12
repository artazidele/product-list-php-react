<?php
include_once 'Disk.php';

class Furniture extends Disk {
    private $dimensions;

    public function __construct($sku, $name, $price, $value) {
        if (gettype($value)!="string"){
            parent::__construct($sku, $name, $price, $value);
        } else {
            $this->sku = $sku;
            $this->name = $name;
            $this->price = $price;
            $this->dimensions = $value;
        }
    }

    public function getSaveQuery() {
        if ($this->dimensions === null) {
            return parent::getSaveQuery();
        } else {
            return $sql = "INSERT INTO Products (sku, product_name, price, dimensions)
            VALUES ('$this->sku', '$this->name', '$this->price', '$this->dimensions')";
        }
        
    }
}
?>