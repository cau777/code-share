export function createDicebearUrl(seed: string) {
    return `https://avatars.dicebear.com/api/bottts/${seed}.jpg?scale=85&size=256`
}

export type CropAndResize = {
    scale: number;
    top: number;
    left: number;
    width: number;
    height: number;
}