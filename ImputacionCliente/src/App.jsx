import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Inicio from "./components/Inicio";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si está autenticado

  // Función para manejar el login
  const handleLogin = () => {
    setIsAuthenticated(true); // Simula la autenticación
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Ruta protegida */}
        <Route
          path="/inicio"
          element={
            isAuthenticated ? (
              <Inicio />
            ) : (
              <Navigate to="/" /> // Redirige al login si no está autenticado
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
