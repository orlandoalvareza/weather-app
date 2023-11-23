const apiKey = process.env.REACT_APP_API_KEY;

async function fetchData(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
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