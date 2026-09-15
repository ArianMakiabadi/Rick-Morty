import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ErrorBoundary } from "./components/ErrorBoundary.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
