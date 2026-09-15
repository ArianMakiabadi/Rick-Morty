import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Search } from "./Navbar";

function ControlledSearch() {
  const [query, setQuery] = useState("");
  return (
    <>
      <Search query={query} setQuery={setQuery} />
      <span data-testid="value">{query}</span>
    </>
  );
}

describe("Navbar's Search", () => {
  it("renders the current query value", () => {
    render(<Search query="rick" setQuery={vi.fn()} />);

    expect(screen.getByPlaceholderText("Search...")).toHaveValue("rick");
  });

  it("calls setQuery with the typed value as the user types", async () => {
    const user = userEvent.setup();
    render(<ControlledSearch />);

    await user.type(screen.getByPlaceholderText("Search..."), "morty");

    expect(screen.getByPlaceholderText("Search...")).toHaveValue("morty");
    expect(screen.getByTestId("value")).toHaveTextContent("morty");
  });
});
