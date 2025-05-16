<?php
require 'Config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nama'], $data['harga'], $data['stok'])) {
    echo json_encode(["error" => "Data tidak lengkap"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO produk (nama, harga, stok) VALUES (?, ?, ?)");
$stmt->execute([$data['nama'], $data['harga'], $data['stok']]);

echo json_encode(["status" => "success"]);
?>