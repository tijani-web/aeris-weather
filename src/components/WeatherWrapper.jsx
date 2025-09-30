import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import LogoDarkMode from '/logoDark.png';
import LogoLightMode from '/logoWhite.png';


const WeatherWrapper = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="weather-wrapper">
      <header className="app-header">
        <div className="logo">
            {darkMode ? <img src={LogoDarkMode} alt="Logo" width={100} height={100} /> : <img src={LogoLightMode} alt="Logo" width={100} height={100} />}
        </div>
        <ThemeToggle darkMode={darkMode} toggleMode={toggleMode} />
      </header>
      <main className="main-content">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default WeatherWrapper;