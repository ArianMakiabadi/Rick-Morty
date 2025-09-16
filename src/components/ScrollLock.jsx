import { useEffect } from "react";
import { useContext } from "react";
import { SelectedIdContext } from "../App";

function ScrollLock() {
  const { selectedId } = useContext(SelectedIdContext);
  const active = !!selectedId;
  useEffect(() => {
    const target = document.documentElement; // <html>
    if (active) {
      target.classList.add("overflow-hidden");
    } else {
      target.classList.remove("overflow-hidden");
    }
  }, [active]);
  return null;
}

export default ScrollLock;
