const apiKey = process.env.REACT_APP_API_KEY;

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorMessage = `HTTP error! Status: ${response.status}`;
      return { data: null, error: new Error(errorMessage) };
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function getLocation(lat: number, lon: number) {
  const currentPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  const currentPosition = await fetchData(currentPositionUrl);
  return currentPosition;
}

export async function fetchCurrentWeather(location: string) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const currentWeatherData = await fetchData(currentWeatherUrl);
  return currentWeatherData;
}

export async function fetchForecastWeather(location: string) {
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  const forecastWeatherData = await fetchData(forecastWeatherUrl);
  return forecastWeatherData;
}