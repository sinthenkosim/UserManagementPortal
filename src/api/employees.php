<?php
require 'db.php';

$stmt = $pdo->query("
    SELECT 
        emp_number,
        first_name,
        last_name,
        department,
        job_title,
        company
    FROM current_employees
    ORDER BY last_name
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
