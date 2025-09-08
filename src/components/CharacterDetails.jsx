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
    <div className="max-w-[80%] max-h-[80%] mx-auto">
      <div
        className="rounded-3xl overflow-hidden bg-slate-800"
        style={{ flex: 1 }}
      >
        {/* Character Info Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:gap-10 overflow-hidden p-4">
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
        {/* Divider */}
        <hr className="h-0.5 bg-gray-600 rounded-3xl my-0.5 mx-6"></hr>

        {/* Episodes Section */}
        <div className=" p-4 ">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-slate-400 ">
              Episodes Featuring {selectedCharacter.name}:
            </h2>
            <button>
              <ArrowUpCircleIcon
                className="w-8 h-8 text-slate-300 transition-all duration-300 ease-in-out
"
              />
            </button>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-52 overflow-auto pr-2">
            {episodes.map((item, index) => (
              <li
                className="bg-gray-700 rounded-3xl p-3 shadow hover:bg-gray-600 transition"
                key={item.id}
              >
                <div className="text-slate-200">
                  {item.episode} : <strong>{item.name}</strong>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Air Date: {item.air_date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
