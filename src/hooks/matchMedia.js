import { useState, useEffect } from "react";

const useMatchMedia = (initialState, query) => {
  const [state, setState] = useState(initialState);
  const changeState = () => {
    if (window.matchMedia(query).matches) {
      setState(true);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    changeState();

    window.addEventListener("resize", changeState);
    return () => window.removeEventListener("resize", changeState);
  }, []);

  return { state, setState };
};

export default useMatchMedia;
