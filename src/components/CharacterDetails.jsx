import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CharacterDetails({ selectedId }) {
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
      <div className="character-detail">
        <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{selectedCharacter.gender === "Male" ? "🙍‍♂️" : "🙎‍♀️"}</span>
            <span>&nbsp;{selectedCharacter.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${
                selectedCharacter.status === "Dead" ? "red" : ""
              }`}
            ></span>
            <span>&nbsp;{selectedCharacter.status}</span>
            <span> -&nbsp;{selectedCharacter.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{selectedCharacter.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favourite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
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
