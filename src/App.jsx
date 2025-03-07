import { useState, useEffect } from "react";
import { ThemeProvider } from "./utils/ThemeContext/ThemeContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import Login from "./components/login/login";
import ConfigUser from "./components/configUser/configUser";
import { Client, Account } from 'appwrite';
import LoadingScreen from './components/loadingScreen/loadingScreen';
import "./App.css";
import TesteAlarm from "./components/TesteAlarm/TesteAlarm";

function App() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializado como null
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o tempo da tela de carregamento
  const client = new Client();
  const account = new Account(client);
  client.setProject('lobbyninja');

  const checkToken = () => {
    return localStorage.getItem("cookieFallback") || null;
  };

  const validateToken = async () => {
    try {
      const user = await account.get();
      console.log("Usuário autenticado:", user);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("cookieFallback");
      console.error("Erro na validação do token:", error);
      setIsAuthenticated(false);
      setToken("");
    }
  };

  useEffect(() => {
    const userToken = checkToken();
    if (userToken) {
      setToken(userToken);
      validateToken();
    } else {
      console.log("Nenhum token encontrado no localStorage.");
      setIsAuthenticated(false);
    }

    const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // if (!isAuthenticated) {
  //   return (
  //     <div className="app-container">
  //       <Routes>
  //         <Route path="*" element={<Login />} />
  //       </Routes>
  //     </div>
  //   );
  // }

  return (
    <ThemeProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Main />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/alarm" element={<TesteAlarm />} />
            <Route path="/registered" element={<Main />} />
            <Route path="/skipped" element={<Main />} />
            <Route path="/favorites" element={<Main />} />
            <Route path="/deleted" element={<Main />} />
            <Route path="/config" element={<ConfigUser />} />

            {/* Rota coringa para redirecionar para /dashboard se o usuário estiver logado e acessar uma URL inválida */}
            <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
