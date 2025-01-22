<?php
// Deshabilitar la salida de errores PHP en HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS, terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar que sea una solicitud PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// Conexión a la base de datos MySQL
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
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
    
    if (!isset($data->id)) {
        throw new Exception("ID de imputación no proporcionado");
    }
    
    // Preparar la consulta SQL
    $stmt = $conn->prepare(
        "UPDATE imputaciones 
         SET fecha = ?, hora_inicio = ?, hora_fin = ?, horas = ?, 
             proyecto = ?, tarea = ?, descripcion = ?
         WHERE id = ?"
    );
    
    if (!$stmt) {
        throw new Exception("Error en la preparación de la consulta: " . $conn->error);
    }
    
    $stmt->bind_param("sssdssis",
        $data->fecha,
        $data->horaInicio,
        $data->horaFin,
        $data->horas,
        $data->proyecto,
        $data->tarea,
        $data->descripcion,
        $data->id
    );
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Imputación actualizada correctamente"
            ]);
        } else {
            throw new Exception("No se encontró la imputación o no hubo cambios");
        }
    } else {
        throw new Exception("Error al actualizar la imputación: " . $stmt->error);
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