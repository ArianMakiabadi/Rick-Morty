import { HeartIcon } from "@heroicons/react/24/outline";
import { Children } from "react";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="rick-sanchez.png" />
      </div>
      {children}
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
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
