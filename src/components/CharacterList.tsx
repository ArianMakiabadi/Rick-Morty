import useSelectedId from "../hooks/useSelectedId";
import type { Character } from "../types/Character";
import { getStatusColor } from "../lib/statusColor";

type CharacterListProps = {
  allCharacters: Character[];
  isLoading: boolean;
};

type CharacterProps = {
  item: Character;
};

function CharacterList({ allCharacters, isLoading }: CharacterListProps) {
  if (isLoading) {
    return (
      <div className="text-center text-slate-400 py-10">Loading...</div>
    );
  }

  if (allCharacters.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10">
        No characters found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto flex-1 px-8">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item }: CharacterProps) {
  const { setSelectedId } = useSelectedId();

  return (
    <button
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
        <span className={`status ${getStatusColor(item.status)}`}></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
    </button>
  );
}
