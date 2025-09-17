import "./output.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favorites, Search, SearchCount } from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Pages from "./components/Pages";
import useLocalStorage from "./hooks/useLocalStorage";
import useCharacters from "./hooks/useCharacters";
import ScrollLock from "./components/ScrollLock";
import SelectedIdProvider from "./Context/SelectedIdProvider";

function App() {
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

  return (
    <div>
      <div ref={topRef}></div> {/* used to scroll to the top of the page*/}
      <Toaster />
      <SelectedIdProvider>
        <ScrollLock />
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
        <CharacterDetails
          onAddFavorite={handleAddFavorites}
          favorites={favorites}
        />
      </SelectedIdProvider>
      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </div>
  );
}

export default App;
