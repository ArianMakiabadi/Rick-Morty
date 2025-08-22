import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="RickMorty.svg" />
      </div>
      {children}
    </nav>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search..."
    />
  );
}

export function SearchCount({ resultCount }) {
  return <div className="navbar__result">Found {resultCount} characters</div>;
}

export function Favourites({ countFavourites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{countFavourites}</span>
    </button>
  );
}
