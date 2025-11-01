# Rick & Morty

A small React app that displays characters from the Rick and Morty API with details, episodes, and a favorites feature. The project uses Vite + React and Tailwind CSS for fast development and styling.

## Live Demo

Visit the deployed app: https://RickMorty.Makiabadi.com

## Technologies

- React (JSX)
- Vite (fast dev server and build)
- Tailwind CSS (utility-first styling)
- Axios (HTTP requests)
- Heroicons (icons)
- lucide-react (icons)
- react-hot-toast (toasts/notifications)
- body-scroll-lock (modal scroll locking)
- Local custom hooks (e.g. `useCharacters`, `useLocalStorage`, `useSelectedId`)

## Features

- Browse characters from the Rick and Morty API
- View character details and episode list in a modal
- Add characters to favorites (stored in localStorage)
- Responsive layout with Tailwind CSS

## Project Structure (top-level)

```
index.html
package.json
tailwind.config.js
vite.config.js
data/
  data.js
public/
src/
  App.jsx
  main.jsx
  input.css
  output.css
  components/
    CharacterDetails.jsx
    CharacterList.jsx
    FavoritesModal.jsx
    Navbar.jsx
    Pages.jsx
  Context/
    SelectedIdProvider.jsx
  hooks/
    useCharacters.js
    useLocalStorage.js
    useSelectedId.js
```

## Getting Started

Prerequisites

- Node.js (14+ recommended)
- npm or yarn

Install dependencies

```bash
# from project root
npm install
```

Run the dev server

```bash
npm run dev
```

When the dev server is running the app will be available at: http://localhost:5173/

## Notes on Implementation

- The app fetches data from the public Rick and Morty API. Character details and episodes are requested via `axios`.
- Character details open inside a modal. While the modal is open the page scroll is locked using `body-scroll-lock`.
- Favorites are persisted with a local storage hook (`useLocalStorage`).

## Contributing

Contributions are welcome. Open an issue or a pull request with a clear description of what you changed and why.

- Vite (fast dev server and build)
- Tailwind CSS (utility-first styling)
- Axios (HTTP requests)
- Heroicons (icons)
- lucide-react (icons)
- react-hot-toast (toasts/notifications)
- body-scroll-lock (modal scroll locking)
- Local custom hooks (e.g. `useCharacters`, `useLocalStorage`, `useSelectedId`)

## Features

- Browse characters from the Rick and Morty API
- View character details and episode list in a modal
- Add characters to favorites (stored in localStorage)
- Responsive layout with Tailwind CSS

## Project Structure (top-level)

```
index.html
package.json
tailwind.config.js
vite.config.js
data/
  data.js
public/
src/
  App.jsx
  main.jsx
  input.css
  output.css
  components/
    CharacterDetails.jsx
    CharacterList.jsx
    FavoritesModal.jsx
    Navbar.jsx
    Pages.jsx
  Context/
    SelectedIdProvider.jsx
  hooks/
    useCharacters.js
    useLocalStorage.js
    useSelectedId.js
```

## Getting Started

Prerequisites

- Node.js (14+ recommended)
- npm or yarn

Install dependencies

```bash
# from project root
npm install
```

Run the dev server

```bash
npm run dev
```

When the dev server is running the app will be available at: http://localhost:5173/

## Notes on Implementation

- The app fetches data from the public Rick and Morty API. Character details and episodes are requested via `axios`.
- Character details open inside a modal. While the modal is open the page scroll is locked using `body-scroll-lock`.
- Favorites are persisted with a local storage hook (`useLocalStorage`).

## Contributing

Contributions are welcome. Open an issue or a pull request with a clear description of what you changed and why.
