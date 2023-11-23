import Header from "./components/Header";

function App() {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.REACT_APP_API_KEY}`;

  fetch(weatherUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  
  return (
    <div className="App">
      <Header/>
      <form>
        <label htmlFor="city">Search for a city</label>
        <input type="text" id="city" name="city"/>
        <button type="submit">Search</button>
      </form>
      <div className="main-temp-container">
        <h2>London</h2>
        <span>28 °C</span>
      </div>
      <div className="forecast-container"></div>
    </div>
  );
}

export default App;
