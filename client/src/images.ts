import axios, {AxiosResponse} from "axios";
import {nanoid} from "nanoid";
import {fromStorage, supabase} from "./supabase_client";

// Create a url to call the Dicebear API with a seed
export function createDicebearUrl(seed: string) {
    return `https://avatars.dicebear.com/api/bottts/${seed}.jpg?scale=85&size=256`
}

export type CropAndResize = {
    scale: number;
    top: number;
    left: number;
}

// Get the height and width from an image source url.
// This method is async because it instantiates an Image element to get its size
export function getImageDims(src: string) {
    return new Promise<{ width: number, height: number }>(resolve => {
        const image = new Image();
        image.onload = (e) => {
            const element = e.target as HTMLImageElement;
            resolve({width: element.width, height: element.height});
        }
        image.src = src;
    });
}

// Calls the image-service api
export function cropAndResizeCall(file: File, options: CropAndResize): Promise<AxiosResponse<Blob>> {
    return axios.postForm("/api/image-service/convert", {
        file,
        scale: options.scale,
        top: options.top,
        left: options.left
    }, {responseType: "blob"});
}

// Get the profile image name associated with a user
export function createUserImageName(id: string) {
    return id + ".jpg";
}

// Get the public url of profile image name associated with a user
export function createUserImageUrl(id: string) {
    return fromStorage(supabase, "profile-pictures").getPublicUrl(createUserImageName(id)).publicURL;
}

export type ImgSource = {
    type: "dicebear";
    src: string;
} | {
    type: "file";
    blob: Blob
    src: string;
} | {
    type: "url",
    src: string;
};

// Create and ImgSource object with the url of a Dicebear avatar with random seed
export function randImgId(): ImgSource {
    return {type: "dicebear", src: createDicebearUrl(nanoid(10))};
}

const CacheControl = "max-age=30";

// Upload a profile picture to Supabase in name of a specific user
export async function updateImage(image: ImgSource, userId: string) {
    const name = createUserImageName(userId);
    
    if (image.type === "dicebear") {
        const buffer = await axios.get<Blob>(image.src, {responseType: "blob"});
        await fromStorage(supabase, "profile-pictures")
            .upload(name, buffer.data, {cacheControl: CacheControl, upsert: true, contentType: "image/jpg"});
    } else if (image.type === "file") {
        await fromStorage(supabase, "profile-pictures")
            .upload(name, image.blob, {cacheControl: CacheControl, upsert: true, contentType: "image/jpg"});
    }
}