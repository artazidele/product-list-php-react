<?php
$servername = "localhost";
$username = "root";
$password = "";
$databasename = "products";

$conn = new mysqli($servername, $username, $password, $databasename);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE Products (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(30) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    price DOUBLE(8, 2) NOT NULL,
    size INT(6) NULL,
    product_weight DOUBLE(6, 3) NULL,
    dimensions VARCHAR(30) NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table Products created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>