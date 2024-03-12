<?php
class Database {
    private $host = "localhost";
    private $database = "products";
    private $username = "root";
    private $password = "";

    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getProducts() {

        $sql = "SELECT id, sku, product_name, price, size, product_weight, dimensions FROM Products";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $products = array();
            while ($row = $result->fetch_assoc()){
                extract($row);
                $product = array(
                    "id" => $row["id"],
                    "sku" => $row["sku"],
                    "product_name" => $row["product_name"],
                    "price" => $row["price"],
                    "size" => $row["size"],
                    "product_weight" => $row["product_weight"],
                    "dimensions" => $row["dimensions"]
                );
                array_push($products, $product);
            }

            echo json_encode($products);
        } else {
            echo json_encode();
        }

        $this->conn->close();
    }

    public function deleteProducts($idArray) {
        $sql = "DELETE FROM Products WHERE id=".$idArray;
        if ($this->conn->query($sql) === TRUE) {
            echo "Success";
        } else {
            echo "Error deleting record: " . $this->conn->error;
        }
    }

    
    public function saveProductToDatabase($sql) {
        if ($this->conn->query($sql) === TRUE) {
            echo "Success";
        } else {
            echo "Error adding product: " .$this->conn->error;
        }
    }

    public function uniqueSKU($data) {

        $sql = "SELECT id, sku, product_name, price, size, product_weight, dimensions FROM Products";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $unique = 0;
            while ($row = $result->fetch_assoc()){
                if ($row["sku"] === $data) {
                    $unique = 1;
                    break;
                }
            }
            if ($unique == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}
?>