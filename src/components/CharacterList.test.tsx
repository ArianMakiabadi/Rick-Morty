import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import SelectedIdProvider from "../Context/SelectedIdProvider";
import useSelectedId from "../hooks/useSelectedId";
import type { Character } from "../types/Character";
import CharacterList from "./CharacterList";

const characters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "rick.png",
    episode: [],
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "morty.png",
    episode: [],
  },
];

function SelectedIdProbe() {
  const { selectedId } = useSelectedId();
  return <div data-testid="selected-id">{selectedId ?? "none"}</div>;
}

function renderWithProvider(ui: ReactNode) {
  return render(
    <SelectedIdProvider>
      {ui}
      <SelectedIdProbe />
    </SelectedIdProvider>
  );
}

describe("CharacterList", () => {
  it("renders each character's name", () => {
    renderWithProvider(
      <CharacterList allCharacters={characters} isLoading={false} />
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("sets the selected id when a character card is clicked", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <CharacterList allCharacters={characters} isLoading={false} />
    );

    expect(screen.getByTestId("selected-id")).toHaveTextContent("none");

    const mortyCard = screen.getByAltText("Morty Smith").closest("button");
    expect(mortyCard).not.toBeNull();
    await user.click(mortyCard as HTMLButtonElement);

    expect(screen.getByTestId("selected-id")).toHaveTextContent("2");
  });

  it("shows a loading state instead of the grid", () => {
    renderWithProvider(<CharacterList allCharacters={[]} isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows an empty state when there are no characters", () => {
    renderWithProvider(<CharacterList allCharacters={[]} isLoading={false} />);

    expect(screen.getByText("No characters found")).toBeInTheDocument();
  });
});
