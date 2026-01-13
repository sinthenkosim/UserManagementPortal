<?php
header("Content-Type: application/json");

$host = "10.0.255.135";
$db   = "cilocaldb";
$user = "itadmin";
$pass = "itaSTONE99";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}
