import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, Mars, Venus } from "lucide-react";

function CharacterDetails({ selectedId, onAddFavorite, isFavorite }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const characters = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setSelectedCharacter(characters.data);

        const episodeIds = characters.data.episode.map((e) =>
          e.split("/").at(-1)
        );
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeIds}`
        );

        // Normalize: always an array
        setEpisodes([episodeData].flat());
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
    fetchData();
  }, [selectedId]);

  if (!selectedCharacter) return <p>Please select a character!</p>;

  return (
    <div style={{ flex: 1 }}>
      {/* Character Info Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:gap-10 bg-slate-800 rounded-3xl mb-6 overflow-hidden p-4">
        <img
          className="w-60 h-60 rounded-full"
          src={selectedCharacter.image}
          alt={selectedCharacter.name}
        />
        <div className="flex flex-col justify-center items-center lg:items-start gap-2 p-4">
          <h3 className="flex items-center text-white text-3xl text-nowrap">
            <span>
              {selectedCharacter.gender === "Male" ? (
                <Mars stroke="#1E90FF" />
              ) : (
                <Venus stroke="#FF69B4" />
              )}
            </span>
            <span>&nbsp;{selectedCharacter.name}</span>
          </h3>
          <div className="text-slate-200">
            <span
              className={`status ${
                selectedCharacter.status === "Dead" ? "red" : ""
              }`}
            ></span>
            <span>&nbsp;{selectedCharacter.status}</span>
            <span> -&nbsp;{selectedCharacter.species}</span>
          </div>
          <p className="text-slate-300 ">
            <span className="font-extrabold">Last known location: </span>
            <span>{selectedCharacter.location.name}</span>
          </p>
          <p className="text-slate-300 mb-6">
            <span className="font-extrabold">Origin: </span>
            <span>{selectedCharacter.origin.name}</span>
          </p>
          <div className="text-slate-400">
            {isFavorite ? (
              <p className="flex flex-row">
                <Check stroke="#28A745" style={{ verticalAlign: "middle" }} />
                &nbsp;This character is added to favorites
              </p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onAddFavorite(selectedCharacter)}
              >
                Add to favourite
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Episodes Section */}
      <div className="bg-slate-800 p-4 rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-slate-400 mb-2">List of episodes:</h2>
          <button>
            <ArrowUpCircleIcon
              className="w-8 h-8 text-slate-300 transition-all duration-300 ease-in-out
"
            />
          </button>
        </div>
        <ul className="list-disc list-inside text-gray-300 max-h-40 overflow-auto">
          {episodes.map((item, index) => (
            <li
              className="flex justify-between items-center py-2"
              key={item.id}
            >
              <div>
                {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetails;
