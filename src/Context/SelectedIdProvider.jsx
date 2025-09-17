import { createContext, useContext, useState } from "react";
export const SelectedIdContext = createContext();

function SelectedIdProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <SelectedIdContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectedIdContext.Provider>
  );
}

export default SelectedIdProvider;
