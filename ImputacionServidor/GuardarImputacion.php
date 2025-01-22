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

// Conexión a la base de datos MySQL
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
    
    // Validar que todos los campos necesarios estén presentes
    $requiredFields = ['fecha', 'horaInicio', 'horaFin', 'horas', 'proyecto', 'tarea', 'descripcion'];
    foreach ($requiredFields as $field) {
        if (!isset($data->$field)) {
            throw new Exception("Campo requerido faltante: " . $field);
        }
    }
    
    // Preparar la consulta SQL
    $stmt = $conn->prepare("INSERT INTO imputaciones (fecha, hora_inicio, hora_fin, horas, proyecto, tarea, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssdsss", 
        $data->fecha,
        $data->horaInicio,
        $data->horaFin,
        $data->horas,
        $data->proyecto,
        $data->tarea,
        $data->descripcion
    );
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Imputación guardada correctamente",
            "id" => $conn->insert_id
        ]);
    } else {
        throw new Exception("Error al guardar la imputación");
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