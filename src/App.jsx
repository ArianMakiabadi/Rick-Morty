import "./output.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favorites, Search, SearchCount } from "./components/Navbar";
import { createContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Pages from "./components/Pages";
import useLocalStorage from "./hooks/useLocalStorage";
import useCharacters from "./hooks/useCharacters";
export const SelectedIdContext = createContext();

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useLocalStorage("Favorites", []);
  const { characters, pageCount, currentPage, setCurrentPage, matchCount } =
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

  return (
    // Preventing CharacterList to scroll when CharacterDetails is open
    <div
      className={`${selectedId ? "overflow-hidden h-screen" : "overflow-auto"}`}
    >
      <div ref={topRef}></div> {/* used to scroll to the top of the page*/}
      <Toaster />
      <SelectedIdContext.Provider value={{ selectedId, setSelectedId }}>
        <Navbar>
          <Search
            query={query}
            setQuery={setQuery}
            setCurrentPage={setCurrentPage}
          />
          <SearchCount matchCount={matchCount} />
          <Favorites favorites={favorites} onRemove={handleRemoveFavorite} />
        </Navbar>
        <CharacterList allCharacters={characters} />
        {/* Rendering of CharacterDetails only when a character is selected */}
        {selectedId && (
          <CharacterDetails
            onAddFavorite={handleAddFavorites}
            isFavorite={isFavorite}
          />
        )}
      </SelectedIdContext.Provider>
      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </div>
  );
}

export default App;
