<?php
require 'Config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["error" => "ID produk tidak ditemukan"]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM produk WHERE id = ?");
$stmt->execute([$data['id']]);

echo json_encode(["status" => "success"]);
?>