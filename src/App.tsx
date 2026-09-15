import "./input.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar, { Favorites, Search, SearchCount } from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Pages from "./components/Pages";
import useLocalStorage from "./hooks/useLocalStorage";
import useCharacters from "./hooks/useCharacters";
import SelectedIdProvider from "./Context/SelectedIdProvider";
import { Character } from "./types/Character";

function App() {
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<Character["status"]>("");
  const [gender, setGender] = useState<Character["gender"]>("");
  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "Favorites",
    [],
  );
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const {
    characters,
    pageCount,
    currentPage,
    setCurrentPage,
    matchCount,
    isLoading,
  } = useCharacters(query, status, gender);

  // Scrolling to the top of the page when page changes
  const topRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  function handleAddFavorites(selectedCharacter: Character) {
    setFavorites((prev) =>
      prev.some((c) => c.id === selectedCharacter.id)
        ? prev
        : [...prev, selectedCharacter],
    );
  }

  function handleRemoveFavorite(id: number) {
    setFavorites((prevFavs) => prevFavs.filter((fav) => fav.id !== id));
  }

  return (
    <SelectedIdProvider>
      <div ref={topRef}></div> {/* used to scroll to the top of the page*/}
      <Toaster />
      <Navbar
        status={status}
        setStatus={setStatus}
        gender={gender}
        setGender={setGender}
      >
        <Search query={query} setQuery={setQuery} />
        <SearchCount matchCount={matchCount} />
        <Favorites
          favorites={favorites}
          onRemove={handleRemoveFavorite}
          isOpen={isFavoritesOpen}
          setIsOpen={setIsFavoritesOpen}
        />
      </Navbar>
      <CharacterList allCharacters={characters} isLoading={isLoading} />
      <CharacterDetails
        onAddFavorite={handleAddFavorites}
        favorites={favorites}
      />
      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </SelectedIdProvider>
  );
}

export default App;
