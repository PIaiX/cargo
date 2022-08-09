import {useState, useEffect} from 'react';

const useMatchMedia = (initialState, query) => {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const changeState = () => {
            if (window.matchMedia(query).matches) {
                setState(false);
            } else {
                setState(true);
            }
        }
        changeState()

        window.addEventListener("resize", changeState);
        return () => window.removeEventListener("resize", changeState);
    }, []);

    return {state, setState}
}

export default useMatchMedia