export function mergeClasses(...items: any[]) {
    let result = " ";
    
    for (let item of items) {
        switch (typeof item) {
            case "undefined":
                continue;
            case "object":
                Object.entries(item).forEach(([name, val]) => result += val ? name + " " : "");
                break
            default:
                result += item + " ";
                break
        }
    }
    
    return result + " ";
}

export type AsyncState<T> = {
    current: "loading"
} | {
    current: "error",
    error: string,
} | {
    current: "ready",
    value: T
}