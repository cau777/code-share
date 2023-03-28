// @returns: A promise that resolves after x millis
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}