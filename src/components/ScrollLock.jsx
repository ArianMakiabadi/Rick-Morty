import { useEffect } from "react";

function ScrollLock({ active }) {
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
