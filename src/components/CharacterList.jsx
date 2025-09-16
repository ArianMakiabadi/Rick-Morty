import { useContext } from "react";
import { SelectedIdContext } from "../App";

function CharacterList({ allCharacters }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto flex-1 px-8">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item }) {
  const { setSelectedId } = useContext(SelectedIdContext);

  return (
    <div
      className="shadow-lg bg-slate-800 hover:bg-slate-700 p-4 rounded-3xl hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col items-center"
      onClick={() => setSelectedId(item.id)}
    >
      <img
        className="rounded-full sm:rounded-3xl max-h-48 sm:max-h-full mx-auto mb-2"
        src={item.image}
        alt={item.name}
      />
      <h3 className="mb-1 max-w-full">
        <span className="block w-full text-xl 2xl:text-2xl text-slate-200 truncate overflow-hidden whitespace-nowrap">
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
  );
}
