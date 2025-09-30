import React from 'react';
import { 
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog,
  WiNightClear, WiDayCloudy, WiNightCloudy, WiRainMix, WiSnowflakeCold
} from 'react-icons/wi';

export const getWeatherIcon = (iconCode, size = 32) => {
  const iconMap = {
    '01d': <WiDaySunny size={size} />,
    '01n': <WiNightClear size={size} />,
    '02d': <WiDayCloudy size={size} />,
    '02n': <WiNightCloudy size={size} />,
    '03d': <WiCloudy size={size} />,
    '03n': <WiCloudy size={size} />,
    '04d': <WiCloudy size={size} />,
    '04n': <WiCloudy size={size} />,
    '09d': <WiRainMix size={size} />,
    '09n': <WiRainMix size={size} />,
    '10d': <WiRain size={size} />,
    '10n': <WiRain size={size} />,
    '11d': <WiThunderstorm size={size} />,
    '11n': <WiThunderstorm size={size} />,
    '13d': <WiSnowflakeCold size={size} />,
    '13n': <WiSnowflakeCold size={size} />,
    '50d': <WiFog size={size} />,
    '50n': <WiFog size={size} />,
  };

  return iconMap[iconCode] || <WiDayCloudy size={size} />;
};

export const getWeatherTheme = (iconCode) => {
  const themeMap = {
    '01d': 'sunny',
    '01n': 'clear-night',
    '02d': 'cloudy',
    '02n': 'cloudy',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rainy',
    '09n': 'rainy',
    '10d': 'rainy',
    '10n': 'rainy',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snowy',
    '13n': 'snowy',
    '50d': 'foggy',
    '50n': 'foggy',
  };

  return themeMap[iconCode] || 'cloudy';
};