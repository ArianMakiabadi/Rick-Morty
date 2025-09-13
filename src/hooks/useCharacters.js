import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const DEBOUNCE_DELAY = 300; // debounce delay

    async function getCharacters() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}&page=${currentPage}`,
          { signal }
        );
        setCharacters(data.results);
        setPageCount(data.info.pages);
      } catch (err) {
        if (axios.isCancel(err)) return; // request was cancelled
        setCharacters([]);
        toast.error(err.response.data.error);
      }
    }

    // setup debounce timeout
    const timeout = setTimeout(getCharacters, DEBOUNCE_DELAY);
    // Cleanup: abort request + clear timeout
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, currentPage]);

  return { characters, pageCount, currentPage, setCurrentPage };
}
