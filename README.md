# Aeris – React Weather Application

Aeris is a modern, responsive weather dashboard built with **React** as part of my **Front-End Web Development Internship at Elevvo Pathways**.  

The project demonstrates clean UI design, API integration, local storage handling, and essential weather features such as **current location weather**, **city search**, and **multi-day forecasts**.

---

## 🚀 Features

- 📍 **Current location weather** with geolocation support  
- 🔎 **Search for cities** worldwide (OpenWeather API)  
- 💾 **Save & manage favorite cities** (local storage)  
- 🌤️ **3-day forecast** for each saved city  
- 🔄 **Metric / Imperial toggle** (°C / °F)  
- 🌓 **Dark/Light mode theme support**  
- 🎨 **Dynamic icons & themes** that match real-time weather (sunny, rainy, snowy, foggy, thunderstorm, etc.)  
- ⚡ **Fast performance** powered by Vite  

---

## 🛠️ Tech Stack

- **React** – Component-based UI  
- **CSS** – Custom styling (responsive + theme-based)  
- **React Icons (Weather Icons)** – Weather conditions visuals  
- **Vite** – Fast dev environment & build tool  
- **OpenWeather API** – Real-time weather & forecast data  

---

## 📂 Project Structure

```plaintext
src/
  components/
    Dashboard.js        // main parent layout
    SearchBar.js        // search input for new cities
    LocationWeather.js  // auto-detect current location weather
    WeatherCard.js      // city card with forecast
    ModeToggle.js       // dark/light mode switch
    Spinner.js          // loading spinner
    Footer.js           // app footer
  utils/
    weatherUtils.js     // weather icons + theme mapping
  styles/
    footer.css
    locationWeather.css
    modeToggle.css
    searchBar.css
    spinner.css
    weatherCard.css
  App.jsx
  Main.jsx
```

```
Getting Started
Prerequisites

Node.js (>= 18.x recommended)

npm or yarn
```

``` Clone the repository
git clone https://github.com/tijani-web/aeris-weather.git
cd aeris
```

``` Install dependencies
npm install
````
``` Run the development server
npm run dev
````
This project was completed as part of the **Elevvo Pathways Front-End Web Development Internship**.  

Special thanks to:  
- Elevvo Pathways([https://www.linkedin.com/company/elevvopaths/]) for the opportunity  
- Vite [https://vitejs.dev/] – build tool
