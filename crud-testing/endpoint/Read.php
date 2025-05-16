<?php
require 'Config.php';

$stmt = $pdo->query("SELECT * FROM produk ORDER BY id DESC");
$produk = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "status" => "success",
    "data" => $produk
]);
?>