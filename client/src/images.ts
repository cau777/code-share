import axios, {AxiosResponse} from "axios";
import {nanoid} from "nanoid";
import {fromStorage, supabase} from "./supabase_client";

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
        const image = new Image();
        image.onload = (e) => {
            const element = e.target as HTMLImageElement;
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

export function createUserImageName(id: string) {
    return id + ".jpg";
}

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

export function randImgId(): ImgSource {
    return {type: "dicebear", src: createDicebearUrl(nanoid(10))};
}

export async function uploadImage(image: ImgSource, userId: string) {
    if (image.type === "dicebear") {
        const buffer = await axios.get<Blob>(image.src, {responseType: "blob"});
        await fromStorage(supabase, "profile-pictures")
            .upload(createUserImageName(userId), buffer.data);
    } else if (image.type === "file") {
        await fromStorage(supabase, "profile-pictures")
            .upload(createUserImageName(userId), image.blob);
    }
}

export async function updateImage(image: ImgSource, userId: string) {
    const name = createUserImageName(userId);
    
    if (image.type === "dicebear") {
        const buffer = await axios.get<Blob>(image.src, {responseType: "blob"});
        await fromStorage(supabase, "profile-pictures")
            .upload(name, buffer.data, {cacheControl: "100s", upsert: true, contentType: "image/jpg"});
    } else if (image.type === "file") {
        await fromStorage(supabase, "profile-pictures")
            .upload(name, image.blob, {cacheControl: "100s", upsert: true, contentType: "image/jpg"});
    }
}