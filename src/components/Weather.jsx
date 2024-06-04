import { useEffect, useState } from "react";
import styled from "styled-components";

const WeatherBox = styled.div`
  flex-shrink: 0;
  display: block;
  width: 100%;
  height: 200px;
  border-radius: 20px;
`;

const WeatherInner = styled.div``;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const city = "Seoul";

  useEffect(() => {
    const apiURI = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cd80ec5a60822de9c96ffb318597e7e4";

    const fetchWeather = async () => {
      try {
        const response = await fetch(apiURI);
        if (!response.ok) {
          throw new Error("날씨 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>로딩 중...</div>;
  }

  const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);

  return (
    <WeatherBox>
      <WeatherInner>
        <p>KOREA</p>
        <p>현재온도 : {temperatureCelsius}°C</p>
        <p>현재습도 : {weatherData.main.humidity}%</p>
        <p>날씨 : {weatherData.weather[0].main}</p>
        <p>상세날씨설명 : {weatherData.weather[0].description}</p>
        {/* <p>날씨 이미지 : {weatherData.weather[0].icon}</p> */}
        <p>바람 : {weatherData.wind.speed} m/s</p>
        {/* <p>나라 : {weatherData.sys.country}</p> */}
        {/* <p>도시이름 : {weatherData.name}</p> */}
        {/* <p>구름 : {weatherData.clouds.all}%</p> */}
      </WeatherInner>
    </WeatherBox>
  );
};

export default Weather;
