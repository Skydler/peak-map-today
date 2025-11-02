import MapToday from "./assets/map.json";

const App = () => {
  const currentMap = MapToday.map.toUpperCase();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Today's Map</h1>
        <p>The map for today is: {currentMap}</p>
      </header>
    </div>
  );
};

export default App;
