import {FC, useRef} from "react";
import {createUserImageUrl, ImgSource} from "../../src/images";
import ProfileImageEdit from "./ProfileImageEdit";
import defaultUser from "../../public/img/profile_avatar.png";
import BtnPrimary from "../basic/BtnPrimary";
import {useTranslation} from "next-i18next";

type Props = {
    id: string;
    onCancel: () => void;
    onSave: (value: ImgSource) => void;
}

const ProfileImageEditSection: FC<Props> = (props) => {
    const initial: ImgSource = {type: "url", src: createUserImageUrl(props.id) ?? defaultUser.src};
    const imgSource = useRef<ImgSource>(initial);
    const {t} = useTranslation();
    
    return (
        <div className={"text-sm"}>
            <ProfileImageEdit initial={initial} onSourceChanged={value => imgSource.current = value}></ProfileImageEdit>
            <div className={"flex justify-center gap-1"}>
                <BtnPrimary type={"button"} onClick={() => props.onSave(imgSource.current)}>{t("save")}</BtnPrimary>
                <BtnPrimary type={"button"} onClick={props.onCancel}>{t("cancel")}</BtnPrimary>
            </div>
        </div>
    )
}

export default ProfileImageEditSection;