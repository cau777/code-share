import {ChangeEvent, FC, useState} from "react";
import {useTranslation} from "next-i18next";
import {useEffectOnMount} from "../../src/hooks";
import {CropAndResize, cropAndResizeCall, getImageDims, ImgSource, randImgId} from "../../src/images";
import ImageCropAndResize from "../basic/ImageCropAndResize";
import Image from "next/image";
import BtnSecondary from "../basic/BtnSecondary";

type Props = {
    onSourceChanged: (value: ImgSource) => void;
    initial?: ImgSource;
}

type ChoosingFileState = {
    file: File;
    src: string;
    width: number;
    height: number;
}

// Inner component to change the profile picture
const ProfileImageEdit: FC<Props> = (props) => {
    let {t} = useTranslation();
    const [imgSource, setImgSource] = useState<ImgSource>(() => {
        let id = props.initial ?? randImgId();
        props.onSourceChanged(id);
        return id;
    });
    
    const [choosingFile, setChoosingFile] = useState<ChoosingFileState>();
    
    useEffectOnMount(() => {
        return () => {
            if (imgSource.type === "file")
                URL.revokeObjectURL(imgSource.src)
            if (choosingFile !== undefined)
                URL.revokeObjectURL(choosingFile.src);
        }
    });
    
    async function startCropAndResize(e: ChangeEvent<HTMLInputElement>) {
        const element = e.currentTarget;
        if (element.files === null || element.files === undefined) return;
        const file = element.files[0];
        const src = URL.createObjectURL(file);
        const size = await getImageDims(src);
        setChoosingFile({file, src, ...size});
    }
    
    function endCropAndResize() {
        const input = document.getElementById("fileInput") as HTMLInputElement;
        input.value = null!;
        if (!choosingFile) return;
        setChoosingFile(undefined);
    }
    
    async function submitFile(value: CropAndResize) {
        if (!choosingFile) return;
        if (imgSource.type === "file")
            URL.revokeObjectURL(imgSource.src)
        
        endCropAndResize();
        try {
            const response = await cropAndResizeCall(choosingFile.file, value);
            
            changeImg({
                type: "file",
                src: URL.createObjectURL(response.data),
                blob: response.data
            });
        } catch (e) {
            alert("Sorry, this image format might not be supported")
        }
    }
    
    function changeImg(value: ImgSource) {
        setImgSource(value);
        props.onSourceChanged(value);
    }
    
    return (
        <>
            {choosingFile && (
                <ImageCropAndResize width={choosingFile.width} height={choosingFile.height} src={choosingFile.src}
                                    onCancel={endCropAndResize} onSubmit={submitFile}></ImageCropAndResize>)}
            <div className={"mx-3"}>
                <div className={"relative mb-1"}>
                    <Image src={imgSource.src} alt={t("altRandomAvatar")} width={"100%"}
                           height={"100%"}
                           layout={"responsive"} objectFit={"contain"} className={"rounded-full"}/>
                </div>
                <div className={"flex gap-1 justify-center"}>
                    <BtnSecondary type={"button"}
                                  onClick={() => changeImg(randImgId())}>{t("random")}</BtnSecondary>
                    
                    <BtnSecondary type={"button"}>
                        <label htmlFor={"fileInput"}>{t("chooseFromFile")}</label>
                        <input type={"file"} className={"hidden"} id={"fileInput"}
                               onChange={startCropAndResize}/>
                    </BtnSecondary>
                </div>
            </div>
        </>
    )
}

export default ProfileImageEdit;