// Accepts any number of items to form a class for html element.
// An item can be a string to be concatenated or an object where each key is a class and each value is a boolean
// that determines if that class is added or not
export function mergeClasses(...items: any[]) {
    let result = " ";
    
    for (const item of items) {
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
