import {FC, useState} from "react";

type Props = {

}

const PictureCropAndResize: FC<Props> = (props) => {
    let [position, setPosition] = useState<{ left: number, top: number }>({top: 0, left: 0});
    
    return (
        <div></div>
    )
}

export default PictureCropAndResize;