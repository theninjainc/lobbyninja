// src/components/loading/LoadingScreen.js
import React from 'react';
import './loadingScreen.module.css';
import logo from '../../assets/logo.svg'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Logo" className="loading-logo" />
    </div>
  );
};

export default LoadingScreen;
