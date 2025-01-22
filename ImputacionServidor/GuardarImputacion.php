<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'appimputacion');

try {
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
    
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error en el formato JSON");
    }
    
    $requiredFields = ['fecha', 'horaInicio', 'horaFin', 'horas', 'proyecto', 'tarea', 'descripcion', 'userId', 'userName'];
    foreach ($requiredFields as $field) {
        if (!isset($data->$field)) {
            throw new Exception("Campo requerido faltante: " . $field);
        }
    }
    
    $stmt = $conn->prepare(
        "INSERT INTO imputaciones (fecha, hora_inicio, hora_fin, horas, proyecto, tarea, descripcion, user_id, user_name) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    
    $stmt->bind_param("sssdsssss", 
        $data->fecha,
        $data->horaInicio,
        $data->horaFin,
        $data->horas,
        $data->proyecto,
        $data->tarea,
        $data->descripcion,
        $data->userId,
        $data->userName
    );
    
    if ($stmt->execute()) {
        $nuevoId = $conn->insert_id;
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Imputación guardada correctamente",
            "id" => $nuevoId
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