import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Inicio from "./components/Inicio";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserId(userData.userId);
    setUserName(userData.userName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/inicio"
          element={
            isAuthenticated ? (
              <Inicio userId={userId} userName={userName} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;