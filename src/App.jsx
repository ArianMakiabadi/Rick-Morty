import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      try {
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(data.results);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
    getCharacters();
  }, []);

  return (
    <div className="app">
      <div>
        <Toaster />
      </div>
      <Navbar resultCount={characters.length} />
      <div className="main">
        <CharacterList allCharacters={characters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
