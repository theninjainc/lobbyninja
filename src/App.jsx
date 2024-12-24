import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import "./App.css";
import Registered from "./components/registered/registered";

function App() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/registered" element={<Registered />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
