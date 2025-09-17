import { useEffect } from "react";
import useSelectedId from "../hooks/useSelectedId";

function ScrollLock() {
  const { selectedId } = useSelectedId();
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
