import {FC} from "react";
import {useWindowWidth} from "../../src/hooks";
import {LgScreen, MdScreen, XlScreen} from "../../src/styling";

type RenderCallback = () => JSX.Element;
type Breakpoint = FC<{ render: RenderCallback }>;

export const AboveSm: Breakpoint = (props) =>
    (<Breakpoint minWidth={MdScreen} render={props.render}></Breakpoint>);

export const AboveMd: Breakpoint = (props) =>
    (<Breakpoint minWidth={LgScreen} render={props.render}></Breakpoint>);

export const AboveLg: Breakpoint = (props) =>
    (<Breakpoint minWidth={XlScreen} render={props.render}></Breakpoint>);

export const BelowMd: Breakpoint = (props) =>
    (<Breakpoint maxWidth={MdScreen} render={props.render}></Breakpoint>);

export const BelowLg: Breakpoint = (props) =>
    (<Breakpoint maxWidth={LgScreen} render={props.render}></Breakpoint>);

export const BelowXl: Breakpoint = (props) =>
    (<Breakpoint maxWidth={XlScreen} render={props.render}></Breakpoint>);

// noinspection JSUnusedLocalSymbols - WebStorm gives wrong inspection

// Base component to render from a function if the window width is in a range
// This imitates Tailwind's behaviour, but it doesn't render the component instead of rendering and hiding it
const Breakpoint: FC<{ minWidth?: number, maxWidth?: number, render: RenderCallback }> = (props) => {
    const windowWidth = useWindowWidth() ?? MdScreen;
    
    return (props.minWidth !== undefined && windowWidth <= props.minWidth) || (props.maxWidth !== undefined && windowWidth > props.maxWidth)
        ? <></>
        : <>{props.render()}</>;
}