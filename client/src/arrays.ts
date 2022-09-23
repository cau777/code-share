export function arraysAreEqual<T>(arr1: Uint8Array, arr2: Uint8Array) {
    return arr1.every((val, index) => val === arr2[index]);
}

export function zipArrays<T1, T2>(arr1: ArrayLike<T1>, arr2: ArrayLike<T2>) {
    const result: [T1, T2][] = [];
    if (arr1.length !== arr2.length) throw new RangeError("Can't zip arrays with different length");
    
    for (let i = 0; i < arr1.length; i++) {
        result.push([arr1[i], arr2[i]])
    }
    
    return result;
}