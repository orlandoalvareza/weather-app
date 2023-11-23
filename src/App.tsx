import Header from "./components/Header";

function App() {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.REACT_APP_API_KEY}`;
  
  return (
    <div className="App">
      <Header/>
      <form>
        <label htmlFor="city">Search for a city</label>
        <input type="text" id="city" name="city"/>
        <button type="submit">Search</button>
      </form>
      <div className="temperature-container">
        28 *C
      </div>
    </div>
  );
}

export default App;
