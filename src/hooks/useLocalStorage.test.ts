import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("returns the parsed stored value when present", () => {
    localStorage.setItem("key", JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("updates localStorage when the setter is called", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("updated-value");
    });

    expect(result.current[0]).toBe("updated-value");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("updated-value"));
  });

  it("falls back to the initial value when stored JSON is malformed", () => {
    localStorage.setItem("key", "{not valid json");

    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("default");
  });
});
