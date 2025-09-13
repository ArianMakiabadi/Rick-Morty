import "./output.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favorites, Search, SearchCount } from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Pages from "./components/Pages";
import useLocalStorage from "./hooks/useLocalStorage";
import useCharacters from "./hooks/useCharacters";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useLocalStorage("Favorites", []);
  const { characters, pageCount, currentPage, setCurrentPage } =
    useCharacters(query);

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

  const isFavorite = favorites.map((fav) => fav.id).includes(selectedId);
  // Preventing CharacterList to scroll when CharacterDetails is open
  useEffect(() => {
    if (selectedId) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedId]);

  return (
    <div>
      <div ref={topRef}></div> {/* used to scroll to the top of the page*/}
      <Toaster />
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
          setCurrentPage={setCurrentPage}
        />
        <SearchCount resultCount={characters.length} />
        <Favorites
          favorites={favorites}
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
