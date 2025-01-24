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
import { Client, Account } from 'appwrite';
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const client = new Client();
  const account = new Account(client);
  client.setProject('lobbyninja');

  // Função para buscar o token no localStorage
  const checkToken = () => {
    return localStorage.getItem("cookieFallback") || null; // Pegando o token do localStorage
  };

  // Função para validar o token com account.get()
  const validateToken = async () => {
    try {
      const user = await account.get(); // Fazendo a chamada ao Appwrite para validar o token
      console.log("Usuário autenticado:", user);
      setIsAuthenticated(true); // Atualiza o estado para indicar que o usuário está autenticado
    } catch (error) {
      localStorage.removeItem("cookieFallback");
      console.error("Erro na validação do token:", error);
      setIsAuthenticated(false); // Caso não esteja autenticado, indica no estado
      setToken(""); // Opcional: Limpa o token inválido do estado
    }
  };

  useEffect(() => {
    const userToken = checkToken();
    if (userToken) {
      setToken(userToken); // Atualiza o estado com o token
      validateToken(); // Valida o token com o account.get()
    } else {
      console.log("Nenhum token encontrado no localStorage.");
    }
  }, []);

  if (!isAuthenticated) {
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
