import { EyeIcon } from "@heroicons/react/24/outline";

function CharacterList({ allCharacters, setSelectedId }) {
  return (
    <div className="Characters-list">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} setSelectedId={setSelectedId} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item, setSelectedId }) {
  return (
    <div className="list__item" onClick={() => setSelectedId(item.id)}>
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "🙎‍♂️" : "🙎‍♀️"}</span>
        <span> {item.name}</span>
      </h3>
      <div className="list-item__info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
    </div>
  );
}
