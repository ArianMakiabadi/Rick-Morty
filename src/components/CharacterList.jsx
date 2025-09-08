function CharacterList({ allCharacters, setSelectedId }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto flex-1 px-8">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} setSelectedId={setSelectedId} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item, setSelectedId }) {
  return (
    <div
      className="shadow-lg bg-slate-800 hover:bg-slate-700 p-4 rounded-3xl hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col sm:block"
      onClick={() => setSelectedId(item.id)}
    >
      <img
        className="rounded-full sm:rounded-3xl  mx-auto mb-2"
        src={item.image}
        alt={item.name}
      />
      <h3 className="mx-auto">
        <span className="text-2xl text-slate-200"> {item.name}</span>
      </h3>
      <div className="mx-auto text-slate-400">
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
