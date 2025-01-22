<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS, terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar que sea una solicitud GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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
    
    // Modificamos la consulta para incluir el nombre del usuario
    $query = "SELECT i.*, i.user_name 
             FROM imputaciones i 
             ORDER BY i.fecha DESC, i.hora_inicio DESC";
             
    $result = $conn->query($query);
    
    if ($result === false) {
        throw new Exception("Error al ejecutar la consulta");
    }
    
    $imputaciones = [];
    while ($row = $result->fetch_assoc()) {
        // Formatear la fecha para que coincida con el formato del frontend
        $fecha = new DateTime($row['fecha']);
        
        $imputaciones[] = [
            'id' => $row['id'],
            'fecha' => $fecha->format('Y-m-d'),
            'horaInicio' => $row['hora_inicio'],
            'horaFin' => $row['hora_fin'],
            'horas' => $row['horas'],
            'proyecto' => $row['proyecto'],
            'tarea' => $row['tarea'],
            'descripcion' => $row['descripcion'],
            'user_id' => $row['user_id'],
            'user_name' => $row['user_name']
        ];
    }
    
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data" => $imputaciones
    ]);
    
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