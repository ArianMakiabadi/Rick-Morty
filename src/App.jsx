import "./App.css";
import "./output.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favourites, Search, SearchCount } from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavorites] = useState([]);

  function handleAddFavorites(selectedCharacter) {
    setFavorites((prev) => [...prev, selectedCharacter]);
  }

  const isFavorite = favourites.map((fav) => fav.id).includes(selectedId);

  // Preventing CharacterList to scroll when CharacterDetails is open
  useEffect(() => {
    if (selectedId) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedId]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const DEBOUNCE_DELAY = 300; // debounce delay

    async function getCharacters() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (err) {
        if (axios.isCancel(err)) return; // request was cancelled
        setCharacters([]);
        toast.error(err.response.data.error);
      }
    }

    // setup debounce timeout
    const timeout = setTimeout(getCharacters, DEBOUNCE_DELAY);
    // Cleanup: abort request + clear timeout
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchCount resultCount={characters.length} />
        <Favourites countFavourites={favourites.length} />
      </Navbar>

      <CharacterList allCharacters={characters} setSelectedId={setSelectedId} />

      {/* Rendering of CharacterDetails only when a character is selected */}
      {selectedId && (
        <CharacterDetails
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onAddFavorite={handleAddFavorites}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}

export default App;
