<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dir = dirname($_SERVER['DOCUMENT_ROOT']) . '/reviews-data';
$file = $dir . '/reviews.json';
if (!is_dir($dir)) {
    @mkdir($dir, 0750, true);
}

function respond(int $code, array $body)
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

/* GET: list all reviews, newest first */
if ($method === 'GET') {
    $all = is_file($file) ? json_decode((string) file_get_contents($file), true) : [];
    if (!is_array($all)) {
        $all = [];
    }
    usort($all, fn($a, $b) => strcmp($b['date'], $a['date']));
    respond(200, ['reviews' => array_slice($all, 0, 50)]);
}

if ($method !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

/* POST: add a review */
$name = trim(strip_tags((string) ($_POST['name'] ?? '')));
$message = trim(strip_tags((string) ($_POST['message'] ?? '')));

if ($name === '' || mb_strlen($name) > 60) {
    respond(422, ['error' => 'Please enter your name.']);
}
if ($message === '' || mb_strlen($message) > 1000) {
    respond(422, ['error' => 'Please write your review.']);
}

$fh = fopen($file, 'c+');
if (!$fh) {
    respond(500, ['error' => 'Reviews are unavailable right now.']);
}
flock($fh, LOCK_EX);
$data = json_decode((string) stream_get_contents($fh), true);
if (!is_array($data)) {
    $data = [];
}

$data[] = [
    'id' => bin2hex(random_bytes(8)),
    'name' => $name,
    'message' => $message,
    'date' => gmdate('c'),
];

ftruncate($fh, 0);
rewind($fh);
fwrite($fh, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
fflush($fh);
flock($fh, LOCK_UN);
fclose($fh);

respond(200, ['ok' => true]);