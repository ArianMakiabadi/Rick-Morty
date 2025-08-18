import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
