import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query, status, gender) {
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchCount, setMatchCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const DEBOUNCE_DELAY = 300; // debounce delay

    async function getCharacters() {
      try {
        // Build query params dynamically so empty filters are not sent
        const params = new URLSearchParams();
        if (query) params.append("name", query);
        if (status) params.append("status", status);
        if (gender) params.append("gender", gender);
        params.append("page", currentPage);

        const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
        const { data } = await axios.get(url, { signal });

        setCharacters(data.results);
        setPageCount(data.info.pages);
        // show match count when any filter/search is active
        if (query !== "" || status || gender) {
          setMatchCount(data.info.count);
        } else {
          setMatchCount(null);
        }
      } catch (err) {
        if (axios.isCancel(err)) return; // request was cancelled
        setCharacters([]);
        // guard in case response isn't present
        const msg = err?.response?.data?.error || "Failed to fetch characters";
        toast.error(msg);
      }
    }

    // setup debounce timeout
    const timeout = setTimeout(getCharacters, DEBOUNCE_DELAY);
    // Cleanup: abort request + clear timeout
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, currentPage, status, gender]);

  return { characters, pageCount, currentPage, setCurrentPage, matchCount };
}
