import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [locDisp, setLocDisp] = useState('');
  const [condition, setCondition] = useState('');
  const [condIcon, setCondIcon] = useState('');

  const fetchWeatherData = async () => {
    try{
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=c79731f3881b408a9cc95446240204&q=${city}&aqi=no`
      );
      setTemp(response.data.current.temp_c + " °C");
      setLocDisp(response.data.location.name + ", " + response.data.location.region);
      setCondition(response.data.current.condition.text);
      setCondIcon(response.data.current.condition.icon);
    }
    catch (error) {
      console.log("Oops");
    }
  }
  
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with city:', city);
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>Sublime Weather Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      <h2>City: {locDisp}</h2>
      <h2>Temperature right now: {temp}</h2>
      <h2>Conditions: {condition}</h2>
      {condIcon && (
        <img src={condIcon} alt={"Weather Icon"} />
      )}
    </div>
  );
}

export default App;
