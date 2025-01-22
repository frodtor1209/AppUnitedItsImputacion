<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS, terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// Conexión a la base de datos MySQL usando constantes
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'usuario');
define('DB_PASSWORD', 'usuario');
define('DB_NAME', 'appimputacion');

try {
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
    
    // Obtener y validar el JSON enviado
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error en el formato JSON");
    }
    
    if (!isset($data->user) || !isset($data->password)) {
        throw new Exception("Datos incompletos");
    }
    
    // Escapar los datos para prevenir SQL injection
    $user = $conn->real_escape_string($data->user);
    $password = $conn->real_escape_string($data->password);
    
    // Consulta preparada para mayor seguridad
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $user, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Bienvenido!"
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Credenciales incorrectas"
        ]);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error en el servidor: " . $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>