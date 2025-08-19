import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    getCharacters();
  }, []);

  return (
    <div className="app">
      <Navbar resultCount={characters.length} />
      <div className="main">
        <CharacterList allCharacters={characters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
