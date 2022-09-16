import React, {FC, useEffect, useRef, useState} from "react";
import {CropAndResize} from "../../src/images";
import Card from "../Card";
import Image from "next/image";
import CircleMask from "../icons/CircleMaskIcon";
import MagnifyingGlassMinusIcon from "../icons/MagnifyingGlassMinusIcon";
import MagnifyingGlassPlusIcon from "../icons/MagnifyingGlassPlusIcon";

type Props = {
    onCancel: () => void;
    onSubmit: (value: CropAndResize) => void;
    src: string;
    width: number;
    height: number;
}

type Position = { top: number, left: number };

type DragStart = { imagePos: Position; mousePos: Position; }

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

const ImageCropAndResize: FC<Props> = (props) => {
    let minScale = Math.max(100, 100 / props.height * props.width);
    
    let [scale, setScale] = useState(minScale);
    let [position, setPosition] = useState<Position>({top: 0, left: 0});
    let [dragStart, setDragStart] = useState<DragStart>();
    let isDragging = dragStart !== undefined;
    
    let maskRef = useRef<HTMLDivElement>(null);
    let imageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!isDragging) return;
        
        function mouseDrag(e: MouseEvent) {
            moveAndClamp({top: e.screenY, left: e.screenX});
        }
        
        function endDrag() {
            setDragStart(undefined);
        }
        
        document.addEventListener("mousemove", mouseDrag);
        document.addEventListener("mouseup", endDrag);
        return () => {
            document.removeEventListener("mousemove", mouseDrag);
            document.removeEventListener("mouseup", endDrag);
        };
    }, [isDragging]);
    
    useEffect(() => {
        setPosition(clampPosition);
    }, [scale]);
    
    function startDragMouse(e: React.MouseEvent) {
        setDragStart({
            mousePos: {top: e.screenY, left: e.screenX},
            imagePos: position
        });
    }
    
    function clampPosition(pos: Position): Position {
        let mask = maskRef.current;
        let image = imageRef.current;
        if (mask === null || image === null) return pos;
        
        return {
            top: clamp(pos.top, mask.clientHeight - image.clientHeight, 0),
            left: clamp(pos.left, mask.clientWidth - image.clientWidth, 0)
        }
    }
    
    function moveAndClamp(nPosition: Position) {
        if (dragStart === undefined) return;
        setPosition(clampPosition({
            top: dragStart.imagePos.top + (nPosition.top - dragStart.mousePos.top),
            left: dragStart.imagePos.left + (nPosition.left - dragStart.mousePos.left)
        }));
    }
    
    function changeScale(value: number) {
        setScale(value);
    }
    
    return (
        <>
            <div className={"absolute top-0 left-0 w-full h-full"}>
                <div className={"relative h-full z-40 bg-black bg-opacity-60 grid-center"} onClick={props.onCancel}>
                    <Card className={"my-auto w-[90vmin] md:w-[60vmin]"} onClick={e => e.stopPropagation()}>
                        <h2 className={"mb-2"}>Crop and Resize</h2>
                        
                        <div className={"relative overflow-hidden cursor-grab mb-1"} onMouseDown={startDragMouse}>
                            <CircleMask className={"text-transparent select-none"}></CircleMask>
                            
                            <div ref={maskRef}
                                 className={"absolute z-50 text-black opacity-60 select-none h-full w-full top-0 left-0"}>
                                <CircleMask></CircleMask>
                            </div>
                            
                            <div className={"absolute z-40 top-0 left-0"} ref={imageRef} style={{
                                width: scale + "%",
                                top: position.top,
                                left: position.left
                            }}>
                                <Image src={props.src} layout={"responsive"} width={props.width} height={props.height}
                                       alt={"chosen file"}></Image>
                            </div>
                        
                        </div>
                        
                        <div className={"flex justify-end gap-1 align-middle"}>
                            <MagnifyingGlassMinusIcon height={"1.5rem"}></MagnifyingGlassMinusIcon>
                            <input type={"range"} min={minScale} max={minScale * 2.5} value={scale}
                                   onChange={o => changeScale(Number(o.currentTarget.value))}/>
                            <MagnifyingGlassPlusIcon height={"1.5rem"}></MagnifyingGlassPlusIcon>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ImageCropAndResize;