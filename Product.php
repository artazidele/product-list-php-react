<?php

abstract class Product {
    public $sku;
    public $name;
    public $price;

    abstract public function __construct($sku, $name, $price, $value);

    abstract public function getSaveQuery();
}

?>