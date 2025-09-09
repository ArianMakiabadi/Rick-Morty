import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  // children[0] → Search
  // children[1] → SearchCount
  // children[2] → Favourites

  return (
    <nav className="flex sticky top-0 items-center justify-between bg-slate-700 py-2 px-4 2xl:rounded-2xl mb-4 max-w-[2000px] mx-auto w-full gap-3">
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
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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

export function Favourites({ countFavourites }) {
  return (
    <button className="relative text-rose-500">
      <HeartIcon className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 text-[0.6rem] bg-rose-500 text-white rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
        {countFavourites}
      </span>
    </button>
  );
}
