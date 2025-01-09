import { useState, useEffect } from "react";
import { ThemeProvider } from "./utils/ThemeContext/ThemeContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import Login from "./components/login/login";
import Registered from "./components/registered/registered";
import Skipped from "./components/skipped/Skipped";
import Favourites from "./components/favourites/favourites";
import Deleted from "./components/deleted/deleted";
import ConfigUser from "./components/configUser/configUser";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  // Função para buscar o token no localStorage
  const checkToken = () => {
    return localStorage.getItem("cookieFallback") || null; // Pegando o token do localStorage
  };

  useEffect(() => {
    const userToken = checkToken();
    setToken(userToken); // Atualiza o estado com o token
    console.log(userToken); // Verifique se está pegando o token corretamente
  }, []);

  if (!token) {
    return (
      <div className="app-container">
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Main />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/skipped" element={<Skipped />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/deleted" element={<Deleted />} />
            <Route path="/config" element={<ConfigUser />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
