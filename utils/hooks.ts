import {useEffect} from "react";

export function useAsyncEffect(func: () => Promise<any>, deps?: any[]) {
    useEffect(() => {
        func().then()
    }, deps);
}