/* eslint-disable react-hooks/exhaustive-deps */
import {EffectCallback, useEffect, useState} from "react";
import {LgScreen, MdScreen, SmScreen, XlScreen} from "./styling";

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

function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

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

export function useWindowWidth() {
    return useWindowSize().width;
}

export function useRelativeWindowSize() {
    let width = useWindowWidth();
    if (width === undefined)
        return "";
    if (width < SmScreen)
        return "sm";
    if (width < MdScreen)
        return "md";
    if (width < LgScreen)
        return "lg";
    if (width < XlScreen)
        return "xl";
}