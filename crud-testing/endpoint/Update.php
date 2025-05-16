<?php
require 'Config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['nama'], $data['harga'], $data['stok'])) {
    echo json_encode(["error" => "Data tidak lengkap"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE produk SET nama = ?, harga = ?, stok = ? WHERE id = ?");
$stmt->execute([$data['nama'], $data['harga'], $data['stok'], $data['id']]);

echo json_encode(["status" => "success"]);
?>