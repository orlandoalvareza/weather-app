const Error = () => {
  return (
    <div>
      <div>
        <h1>An error has occurred</h1>
        <h3>The city entered has not been found</h3>
        <p>Please try again or enter a new city</p>
      </div>
      <form>
        <input 
          type="text" 
          placeholder="Search for a city"
        />
        <button type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default Error;