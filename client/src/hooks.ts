/* eslint-disable react-hooks/exhaustive-deps */
import {EffectCallback, useEffect, useState} from "react";

// Utility function just to avoid the boilerplate of calling an async function inside useEffect
export function useAsyncEffect(func: () => Promise<any>, deps?: any[]) {
    useEffect(() => {
        func().then()
    }, deps);
}

/**
 * @summary Utility hook to avoid eslint inspection and improve readability
 * @param func
 */
export function useEffectOnMount(func: EffectCallback) {
    useEffect(func, []);
}

// Get the window height and width
function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

// Hook to track the window width and height
// Warning: Before the window is rendered, the hook returns an empty object
export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width?: number, height?: number }>({});
    useEffect(() => {
        function handleResize() {
            setWindowSize(getWindowSize());
        }
        
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

// Simplification of useWindowSize() hook
export function useWindowWidth() {
    return useWindowSize().width;
}

