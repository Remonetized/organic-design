<?php 

header('Content-Type: application/json');

$data = [
    'message' => 'Hi from API',
    'author' => 'LK'
];

echo json_encode($data);