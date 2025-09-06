import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  // children[0] → Search
  // children[1] → SearchCount
  // children[2] → Favourites

  return (
    <nav className="flex items-center justify-between bg-slate-700 p-4 xl:rounded-2xl mb-4 max-w-7xl mx-auto w-full gap-3">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="RickMorty.svg"
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">{children[0]}</div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Results only on sm+ */}
        <div className="hidden sm:block">{children[1]}</div>
        {children[2]}
      </div>
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
      className="w-full px-3 py-2 rounded-lg bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  );
}

export function SearchCount({ resultCount }) {
  return (
    <div className="text-slate-400 text-sm md:text-base whitespace-nowrap">
      Found {resultCount} characters
    </div>
  );
}

export function Favourites({ countFavourites }) {
  return (
    <button className="relative text-rose-500">
      <HeartIcon className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 text-xs bg-rose-500 text-white rounded-full px-2 py-0.5 flex items-center justify-center">
        {countFavourites}
      </span>
    </button>
  );
}
