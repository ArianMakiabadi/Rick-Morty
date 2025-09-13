import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import FavoritesModal from "./FavoritesModal";
import { useState } from "react";

function Navbar({ children }) {
  // children[0] → Search
  // children[1] → SearchCount
  // children[2] → Favorites

  return (
    <nav className="flex sticky z-10 top-0 items-center justify-between bg-slate-700 py-2 px-4 2xl:rounded-2xl mb-4 max-w-[2000px] mx-auto w-full gap-3">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="RickMorty.svg"
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10"
        />
      </div>

      {/* Search */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex-1 max-w-md">{children[0]}</div>
        {/* Results only on sm+ */}
        <div className="hidden sm:block">{children[1]}</div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">{children[2]}</div>
    </nav>
  );
}

export default Navbar;

/* Subcomponents */
export function Search({ query, setQuery, setCurrentPage }) {
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setCurrentPage(1);
      }}
      type="text"
      placeholder="Search..."
      className="w-full px-3 py-1 rounded-lg bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  );
}

export function SearchCount({ resultCount }) {
  return (
    <div className="text-slate-400 text-[0.7rem] whitespace-nowrap">
      Found {resultCount} characters
    </div>
  );
}

export function Favorites({ setSelectedId, favorites, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FavoritesModal onOpen={setIsOpen} open={isOpen}>
        {favorites.length === 0 ? (
          <p className="text-slate-400 text-center pt-4">
            Your favorites list is lonelier than Pickle Rick!
          </p>
        ) : (
          favorites.map((item) => (
            <FavoriteCharacter
              key={item.id}
              item={item}
              setSelectedId={setSelectedId}
              onRemove={onRemove}
            />
          ))
        )}
      </FavoritesModal>

      <button
        className="relative text-rose-500"
        onClick={() => setIsOpen(true)}
      >
        <HeartIcon className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 text-[0.6rem] bg-rose-500 text-white rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
          {favorites.length}
        </span>
      </button>
    </>
  );
}

function FavoriteCharacter({ setSelectedId, item, onRemove }) {
  return (
    <div
      className="flex bg-slate-800 m-3 rounded-3xl cursor-pointer"
      onClick={() => {
        setSelectedId(item.id);
      }}
    >
      <img
        className="rounded-full max-h-14 m-2"
        src={item.image}
        alt={item.name}
      />
      <div className="flex flex-col justify-center ml-2">
        <h3 className="max-w-full">
          <span className="block w-full text-sm 2xl:text-2xl text-slate-200 truncate overflow-hidden whitespace-nowrap">
            {item.name}
          </span>
        </h3>
        <div className="mx-auto text-slate-400 text-xs">
          <span
            className={`status ${
              item.status === "Dead"
                ? "bg-rose-600"
                : item.status === "Alive"
                ? "bg-green-600"
                : "bg-yellow-400"
            }`}
          ></span>
          <span> {item.status}</span>
          <span> - {item.species}</span>
        </div>
      </div>
      <button
        className="ml-auto mr-4"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
      >
        <TrashIcon className="w-5 text-red-600 " />
      </button>
    </div>
  );
}
