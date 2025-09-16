import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, CircleHelp, Mars, Venus } from "lucide-react";
import { SelectedIdContext } from "../App";

function CharacterDetails({ onAddFavorite, isFavorite }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const { selectedId, setSelectedId } = useContext(SelectedIdContext);

  useEffect(() => {
    async function fetchData() {
      if (selectedId !== null) {
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
    }
    fetchData();
  }, [selectedId]);

  const genderIcons = {
    Male: <Mars stroke="#1E90FF" />,
    Female: <Venus stroke="#FF69B4" />,
    unknown: <CircleHelp stroke="#A9A9A9" />,
  };

  if (!selectedCharacter || !selectedId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setSelectedId(null)}
    >
      <div
        className="w-[80%] max-w-2xl max-h-[90%] rounded-3xl flex flex-col bg-slate-800"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Character Info Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:gap-10 overflow-hidden p-4 pb-0">
          <img
            className="w-40 lg:w-60 rounded-full"
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
          />
          <div className="flex flex-col justify-center items-center lg:items-start p-2">
            <h3 className="flex items-center text-white text-xl lg:text-3xl text-nowrap">
              <span>{genderIcons[selectedCharacter.gender]}</span>
              <span>&nbsp;{selectedCharacter.name}</span>
            </h3>
            <div className="text-slate-200 text-xs lg:text-sm mb-2">
              <span
                className={`status ${
                  selectedCharacter.status === "Dead"
                    ? "bg-rose-600"
                    : selectedCharacter.status === "Alive"
                    ? "bg-green-600"
                    : "bg-yellow-400"
                }`}
              ></span>
              <span>&nbsp;{selectedCharacter.status}</span>
              <span> -&nbsp;{selectedCharacter.species}</span>
            </div>
            <div className="flex flex-col flex-wrap gap-x-4 text-slate-300 text-sm lg:text-base">
              <p className="text-center lg:text-left">
                <span className="font-extrabold">Last known location: </span>
                <span className="inline-block">
                  {selectedCharacter.location.name}
                </span>
              </p>
              <p className="text-center lg:text-left">
                <span className="font-extrabold">Origin: </span>
                <span className="inline-block">
                  {selectedCharacter.origin.name}
                </span>
              </p>
            </div>

            <div className="text-slate-400 mt-4">
              {isFavorite ? (
                <p className="flex flex-row text-xs">
                  <Check stroke="#28A745" className="w-4 pb-1" />
                  &nbsp;This character is added to favorites
                </p>
              ) : (
                <button
                  className="btn btn--primary text-xs"
                  onClick={() => onAddFavorite(selectedCharacter)}
                >
                  Add to favourite
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr className="h-[1px] bg-gray-600 rounded-3xl my-0.5 lg:mt-4 mx-6"></hr>

        {/* Episodes Section */}
        <div className=" p-4 pt-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-slate-400 text-xs">
              Episodes Featuring {selectedCharacter.name}:
            </h2>
            <button>
              <ArrowUpCircleIcon className="w-6 text-slate-300 transition-all duration-300 ease-in-out" />
            </button>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-2">
            {episodes.map((item) => (
              <li
                className="bg-gray-700 rounded-xl p-3 shadow hover:bg-gray-600 transition"
                key={item.id}
              >
                <div className="text-slate-200 text-xs lg:text-sm">
                  {item.episode} : <strong>{item.name}</strong>
                </div>
                <div className="text-[0.6rem] lg:text-xs text-gray-400 mt-0.5">
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
