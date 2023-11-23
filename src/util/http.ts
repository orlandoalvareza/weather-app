const apiKey = process.env.REACT_APP_API_KEY;

// const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=${apiKey}`;

export async function fetchCurrentWeather(location: string) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
}