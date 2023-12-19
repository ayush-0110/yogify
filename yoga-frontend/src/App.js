import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeEffect, setFadeEffect] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = '/yoga.jpg';
    image.onload = () => {
      setFadeEffect(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    };

 
  }, []);
  const loadingClass = fadeEffect ? 'loading-screen fade-out' : 'loading-screen';
  
  return isLoading ? (
    <div className={loadingClass}>
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="main-content fade-in">
      <HomePage />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
