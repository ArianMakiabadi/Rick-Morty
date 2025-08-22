import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Search, SearchCount } from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    async function getCharacters() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        toast.error(err.response.data.error);
      }
    }
    getCharacters();
  }, [query]);

  return (
    <div className="app">
      <div>
        <Toaster />
      </div>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchCount resultCount={characters.length} />
      </Navbar>
      <Main>
        <CharacterList
          allCharacters={characters}
          setSelectedId={setSelectedId}
        />
        <CharacterDetails selectedId={selectedId} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
