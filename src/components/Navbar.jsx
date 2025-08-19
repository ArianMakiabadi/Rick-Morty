import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ resultCount }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="rick-sanchez.png" />
      </div>
      <input type="text" className="text-field" placeholder="Search..." />
      <div className="navbar__result">Found {resultCount} characters</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
    </nav>
  );
}

export default Navbar;
