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
      <div>
        <Toaster />
      </div>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchCount resultCount={characters.length} />
        <Favourites countFavourites={favourites.length} />
      </Navbar>
      <Main>
        <CharacterList
          allCharacters={characters}
          setSelectedId={setSelectedId}
        />
      </Main>
      {/* Conditional rendering of CharacterDetails with a backdrop */}
      {selectedId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="max-w-[80%] max-h-[80%]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <CharacterDetails
              selectedId={selectedId}
              onAddFavorite={handleAddFavorites}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
