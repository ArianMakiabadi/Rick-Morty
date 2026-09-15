import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Character } from "../types/Character";
import useCharacters from "./useCharacters";

vi.mock("axios");
vi.mock("react-hot-toast");

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  isCancel: ReturnType<typeof vi.fn>;
  isAxiosError: ReturnType<typeof vi.fn>;
};
const mockedToast = toast as unknown as { error: ReturnType<typeof vi.fn> };

const character: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "",
  episode: [],
};

describe("useCharacters", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedAxios.isCancel.mockReturnValue(false);
  });

  it("populates characters, pageCount, and matchCount on a successful fetch", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: [character], info: { pages: 3, count: 25 } },
    });

    const { result } = renderHook(() => useCharacters("rick", "", ""));

    await waitFor(() =>
      expect(result.current.characters).toEqual([character])
    );
    expect(result.current.pageCount).toBe(3);
    expect(result.current.matchCount).toBe(25);
  });

  it("does not crash and shows a toast on an error response", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { error: "Not found" } },
    });

    const { result } = renderHook(() => useCharacters("", "", ""));

    await waitFor(() =>
      expect(mockedToast.error).toHaveBeenCalledWith("Not found")
    );
    expect(result.current.characters).toEqual([]);
    expect(result.current.matchCount).toBeNull();
  });

  it("fetches again after the debounce delay once the query changes", async () => {
    vi.useFakeTimers();
    try {
      mockedAxios.get.mockResolvedValue({
        data: { results: [], info: { pages: 0, count: 0 } },
      });

      const { rerender } = renderHook(
        ({ query }) => useCharacters(query, "", ""),
        { initialProps: { query: "" } }
      );

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);

      rerender({ query: "morty" });
      expect(mockedAxios.get).toHaveBeenCalledTimes(1); // debounce still pending

      await act(async () => {
        await vi.advanceTimersByTimeAsync(300);
      });

      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });
});
