import "./App.css";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForcastHighlights } from "./components/ForcastHighlights";

function App() {
  return (
    <div className="md:flex md:justify-between h-[100vh]">
      <CurrentWeather />
      <ForcastHighlights />
    </div>
  );
}

export default App;
