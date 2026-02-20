import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import FavoritesModal from "./FavoritesModal";
import Filters from "./Filters";
import useSelectedId from "../hooks/useSelectedId";
import { FiFilter } from "react-icons/fi";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Character } from "../types/Character";

type NavbarProps = {
  children: ReactNode[];
  status: Character["status"];
  setStatus: Dispatch<SetStateAction<Character["status"]>>;
  gender: Character["gender"];
  setGender: Dispatch<SetStateAction<Character["gender"]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
function Navbar({
  children,
  status,
  setStatus,
  gender,
  setGender,
  setCurrentPage,
}: NavbarProps) {
  // children[0] → Search
  // children[1] → SearchCount
  // children[2] → Favorites

  const [showFilters, setShowFilters] = useState(false);

  return (
    <nav className="flex flex-col sticky z-10 top-0 bg-slate-700 py-2 px-4 2xl:rounded-2xl mb-4 max-w-[2000px] mx-auto w-full gap-3">
      <div className="flex items-center justify-between w-full gap-3 relative">
        <div className="flex items-center">
          <img
            src="RickMorty.svg"
            alt="Logo"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>

        <div className="flex items-center justify-center gap-4 flex-1">
          <div className="flex-1 max-w-md">{children[0]}</div>

          <div className="flex items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden text-slate-300 hover:text-white transition"
            >
              <FiFilter className="w-6 h-6" />
            </button>

            <div className="hidden sm:block">
              <Filters
                status={status}
                setStatus={setStatus}
                gender={gender}
                setGender={setGender}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
        <div className="hidden xl:block absolute right-20">{children[1]}</div>
        <div className="flex items-center gap-4">{children[2]}</div>
      </div>

      {showFilters && (
        <div className="sm:hidden bg-slate-700 p-4">
          <Filters
            status={status}
            setStatus={setStatus}
            gender={gender}
            setGender={setGender}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;

/* Subcomponents */
type SearchProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export function Search({ query, setQuery, setCurrentPage }: SearchProps) {
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

type SearchCountProps = {
  matchCount: number | null;
};

export function SearchCount({ matchCount }: SearchCountProps) {
  if (matchCount !== null)
    return (
      <div className="text-slate-400 text-[0.7rem] whitespace-nowrap">
        Found {matchCount} characters
      </div>
    );
}

type FavoritesProps = {
  favorites: Character[];
  onRemove: (id: number) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function Favorites({
  favorites,
  onRemove,
  isOpen,
  setIsOpen,
}: FavoritesProps) {
  return (
    <>
      <FavoritesModal onOpen={setIsOpen} open={isOpen}>
        {favorites.length === 0 ? (
          <p className="text-slate-400 text-center pt-4">
            Your favorites list is lonelier than Pickle Rick!
          </p>
        ) : (
          favorites.map((item) => (
            <FavoriteCharacter key={item.id} item={item} onRemove={onRemove} />
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

type FavoriteCharacterProps = {
  item: Character;
  onRemove: (id: number) => void;
};

function FavoriteCharacter({ item, onRemove }: FavoriteCharacterProps) {
  const { setSelectedId } = useSelectedId();

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex bg-slate-800 m-2 rounded-3xl cursor-pointer"
      onClick={() => {
        setSelectedId(item.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedId(item.id);
        }
      }}
    >
      <img
        className="rounded-full max-h-14 m-2"
        src={item.image}
        alt={item.name}
      />
      <div className="flex flex-col justify-center ml-2 overflow-hidden">
        <h3 className="max-w-full">
          <span className="block w-full text-sm 2xl:text-2xl text-slate-200 truncate overflow-hidden whitespace-nowrap">
            {item.name}
          </span>
        </h3>
        <div className=" text-slate-400 text-xs">
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
