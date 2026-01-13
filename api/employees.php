<?php
// ================================
// Enable error reporting (DEV ONLY)
// ================================
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ================================
// Set JSON response headers
// ================================
header('Content-Type: application/json; charset=utf-8');

// ================================
// Database connection
// ================================
require_once __DIR__ . '/db.php';

// ================================
// Fetch employees
// ================================
try {

    $stmt = $pdo->prepare("
        SELECT 
            emp_number,
            first_name,
            last_name,
            company,
            department,
            job_title
        FROM current_employees
        ORDER BY last_name ASC
    ");

    $stmt->execute();

    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'count' => count($employees),
        'data' => $employees
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
