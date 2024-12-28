import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Alarm from "./components/alarm/Alarm";
import "./App.css";
import Registered from "./components/registered/registered";
import Skipped from "./components/skipped/Skipped";
import Favourites from "./components/favourites/favourites";
import ConfigUser from "./components/configUser/configUser";
function App() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/skipped" element={<Skipped />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/config" element={<ConfigUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
