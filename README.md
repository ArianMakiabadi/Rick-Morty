# Rick & Morty Character Explorer

A React + TypeScript app for browsing Rick and Morty characters with search, filtering, pagination, and favorites.

## Live Demo

Visit the deployed app: https://RickMorty.Makiabadi.com

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- react-hot-toast
- body-scroll-lock
- Heroicons, Lucide React, React Icons

## Features

- Search characters by name (debounced requests)
- Filter by status and gender
- Paginated results
- Character details panel with episode information
- Favorites modal with local storage persistence
- Responsive UI for desktop and mobile

## Project Structure

```
index.html
package.json
tailwind.config.ts
vite.config.ts
data/
  data.ts
src/
  App.tsx
  main.tsx
  input.css
  components/
    CharacterDetails.tsx
    CharacterList.tsx
    FavoritesModal.tsx
    Filters.tsx
    Navbar.tsx
    Pages.tsx
  Context/
    SelectedIdProvider.tsx
  hooks/
    useCharacters.ts
    useLocalStorage.ts
    useSelectedId.ts
  types/
    Character.ts
    Episode.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

App runs at http://localhost:5173

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

## Data Source

Data is fetched from the public Rick and Morty API:
https://rickandmortyapi.com/

## Contributing

Contributions are welcome. Open an issue or a pull request with a clear description of what you changed and why.
