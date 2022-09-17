import axios, {AxiosResponse} from "axios";

export function createDicebearUrl(seed: string) {
    return `https://avatars.dicebear.com/api/bottts/${seed}.jpg?scale=85&size=256`
}

export type CropAndResize = {
    scale: number;
    top: number;
    left: number;
}

export function getImageDims(src: string) {
    return new Promise<{ width: number, height: number }>(resolve => {
        let image = new Image();
        image.onload = (e) => {
            let element = e.target as HTMLImageElement;
            resolve({width: element.width, height: element.height});
        }
        image.src = src;
    });
}

export function cropAndResizeCall(file: File, options: CropAndResize): Promise<AxiosResponse<Blob>> {
    return axios.postForm("/api/convert_image", {
        file,
        scale: options.scale,
        top: options.top,
        left: options.left
    }, {responseType: "blob"});
}

export function createUserImageUrl(id: string) {
    return id + ".jpg";
}