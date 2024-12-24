import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Sidebar fixa em todas as páginas */}
      <Sidebar />

      {/* Configuração das Rotas */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Main />} /> {/* Página principal */}
          <Route path="/alarm" element={<Alarm />} /> {/* Página do Alarme */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
