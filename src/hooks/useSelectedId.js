/**
 * useSelectedId
 *
 * A custom hook that provides access to the `selectedId` state and its updater function
 * from the SelectedIdContext. Must be used inside a <SelectedIdProvider>.
 *
 * Example:
 *   const { selectedId, setSelectedId } = useSelectedId();
 */

import { useContext } from "react";
import { SelectedIdContext } from "../Context/SelectedIdProvider";

export default function useSelectedId() {
  const context = useContext(SelectedIdContext);
  if (context === undefined)
    throw new Error("Context was used outside of SelectedIdProvider");
  return context;
}
