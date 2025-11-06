export default function Filters({
  status,
  setStatus,
  gender,
  setGender,
  setCurrentPage,
}) {
  return (
    <div className="flex gap-4 items-center ">
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setCurrentPage(1);
        }}
        className="bg-slate-600 text-slate-100 px-2 py-1 rounded-lg text-sm"
      >
        <option value="">Status: All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={gender}
        onChange={(e) => {
          setGender(e.target.value);
          setCurrentPage(1);
        }}
        className="bg-slate-600 text-slate-100 px-2 py-1 rounded-lg text-sm"
      >
        <option value="">Gender: All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
}
