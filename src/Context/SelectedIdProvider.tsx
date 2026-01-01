import { createContext, ReactNode, useState } from "react";
export const SelectedIdContext = createContext<SelectedIdContextType | null>(
  null
);

type ChildrenType = {
  children: ReactNode;
};

export interface SelectedIdContextType {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

const SelectedIdProvider: React.FC<ChildrenType> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <SelectedIdContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectedIdContext.Provider>
  );
};

export default SelectedIdProvider;
