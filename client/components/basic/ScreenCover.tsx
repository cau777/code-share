import {FC, HTMLProps} from "react";

// Covers the entire screen. Needs to be customized with props.
const ScreenCover: FC<HTMLProps<HTMLDivElement>> = (props) => {
    return (
        <div {...props} style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh"}}></div>
    )
}

export default ScreenCover;