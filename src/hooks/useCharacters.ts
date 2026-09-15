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
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const DEBOUNCE_DELAY = 300; // debounce delay

  // Debounce only the text query so typing doesn't fire a request per keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timeout);
  }, [query]);

  // Reset to page 1 whenever the (debounced) search or a filter actually changes.
  // Done during render (not in an effect) so the fetch effect below never runs
  // with a stale page number for the new filters.
  const [prevFilters, setPrevFilters] = useState({
    query: debouncedQuery,
    status,
    gender,
  });
  if (
    prevFilters.query !== debouncedQuery ||
    prevFilters.status !== status ||
    prevFilters.gender !== gender
  ) {
    setPrevFilters({ query: debouncedQuery, status, gender });
    if (currentPage !== 1) setCurrentPage(1);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setIsLoading(true);
      try {
        // Build query params dynamically so empty filters are not sent
        const params = new URLSearchParams();
        if (debouncedQuery) params.append("name", debouncedQuery);
        if (status) params.append("status", status);
        if (gender) params.append("gender", gender);
        params.append("page", currentPage.toString());

        const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
        const { data } = await axios.get(url, { signal });

        setCharacters(data.results);
        setPageCount(data.info.pages);
        // show match count when any filter/search is active
        if (debouncedQuery !== "" || status || gender) {
          setMatchCount(data.info.count);
        } else {
          setMatchCount(null);
        }
      } catch (err) {
        if (axios.isCancel(err)) return; // request was cancelled
        setCharacters([]);
        setPageCount(0);
        setMatchCount(null);
        // guard in case response isn't present
        let msg = "Failed to fetch characters";

        if (axios.isAxiosError(err)) {
          msg = err.response?.data?.error || msg;
        }
        toast.error(msg);
      } finally {
        // leave isLoading true if superseded; the next effect run sets it again
        if (!signal.aborted) setIsLoading(false);
      }
    })();

    // Cleanup: abort in-flight request on dependency change/unmount
    return () => {
      controller.abort();
    };
  }, [debouncedQuery, currentPage, status, gender]);

  return {
    characters,
    pageCount,
    currentPage,
    setCurrentPage,
    matchCount,
    isLoading,
  };
}
