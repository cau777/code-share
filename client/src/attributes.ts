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

export function compareEntriesBut<T>(object1: T, object2: T, except: (keyof T)[]) {
    let exceptSet = new Set(except);
    
    for (const key in object1) {
        if (exceptSet.has(key))
            continue;
        if (object1[key] !== object2[key]) {
            console.log("Different but", object1[key] , object2[key])
            return false;
        }
    }
    
    return true;
}

export function compareEntries<T>(object1: T, object2: T) {
    for (const key in object1) {
        if (object1[key] !== object2[key]) {
            console.log("Different", object1[key] , object2[key])
            return false;
        }
    }
    
    return true;
}