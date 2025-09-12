import "./App.css";
import "./output.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favourites, Search, SearchCount } from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pages from "./components/Pages";

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [favourites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  // Scrolling to the top of the page when page changes
  const topRef = useRef(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  function handleAddFavorites(selectedCharacter) {
    setFavorites((prev) => [...prev, selectedCharacter]);
  }

  function handleRemoveFavorite(id) {
    setFavorites((prevFavs) => prevFavs.filter((fav) => fav.id !== id));
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
          `https://rickandmortyapi.com/api/character?name=${query}&page=${currentPage}`,
          { signal }
        );
        setCharacters(data.results);
        setPageCount(data.info.pages);
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
  }, [query, currentPage]);

  // saving favourites to localStorage
  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <div className="app">
      <div ref={topRef}></div> {/* used to scroll to the top of the page*/}
      <Toaster />
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
          setCurrentPage={setCurrentPage}
        />
        <SearchCount resultCount={characters.length} />
        <Favourites
          favourites={favourites}
          setSelectedId={setSelectedId}
          onRemove={handleRemoveFavorite}
        />
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
      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </div>
  );
}

export default App;
