import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SelectedIdProvider from "../Context/SelectedIdProvider";
import useSelectedId from "./useSelectedId";

describe("useSelectedId", () => {
  it("defaults selectedId to null", () => {
    const { result } = renderHook(() => useSelectedId(), {
      wrapper: SelectedIdProvider,
    });

    expect(result.current.selectedId).toBeNull();
  });

  it("updates selectedId when the setter is called", () => {
    const { result } = renderHook(() => useSelectedId(), {
      wrapper: SelectedIdProvider,
    });

    act(() => {
      result.current.setSelectedId(42);
    });

    expect(result.current.selectedId).toBe(42);
  });

  it("throws when used outside of SelectedIdProvider", () => {
    expect(() => renderHook(() => useSelectedId())).toThrow(
      "Context was used outside of SelectedIdProvider"
    );
  });
});
