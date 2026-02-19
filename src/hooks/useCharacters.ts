import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Character } from "../types/Character";

export default function useCharacters(
  query: string,
  status: Character["status"],
  gender: Character["gender"],
) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [matchCount, setMatchCount] = useState<number | null>(null);

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
        params.append("page", currentPage.toString());

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
        let msg = "Failed to fetch characters";

        if (axios.isAxiosError(err)) {
          msg = err.response?.data?.error || msg;
        }
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
