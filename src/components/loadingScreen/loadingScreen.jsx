// src/components/loading/LoadingScreen.js
import React from 'react';
import './loadingScreen.module.css';
import logo from '../../assets/logo.svg'

const LoadingScreen = () => {
  return (
    <main>
      <div className="loading-screen">
        <img src={logo} alt="Logo" className="loading-logo" />
      </div>
    </main>
  );
};

export default LoadingScreen;
