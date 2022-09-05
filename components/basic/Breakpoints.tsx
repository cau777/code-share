import {FC, PropsWithChildren} from "react";
import {useWindowWidth} from "../../src/hooks";
import Loading from "./Loading";
import {LgScreen, MdScreen, XlScreen} from "../../src/styling";

type Breakpoint = FC<PropsWithChildren>

export const AboveSm: Breakpoint=(props) =>
    (<Breakpoint minWidth={MdScreen}>{props.children}</Breakpoint>);

export const AboveMd: Breakpoint=(props) =>
    (<Breakpoint minWidth={LgScreen}>{props.children}</Breakpoint>);

export const AboveLg: Breakpoint=(props) =>
    (<Breakpoint minWidth={XlScreen}>{props.children}</Breakpoint>);

export const BelowMd: Breakpoint = (props) =>
    (<Breakpoint maxWidth={MdScreen}>{props.children}</Breakpoint>);

export const BelowLg: Breakpoint = (props) =>
    (<Breakpoint maxWidth={LgScreen}>{props.children}</Breakpoint>);

export const BelowXl: Breakpoint = (props) =>
    (<Breakpoint maxWidth={XlScreen}>{props.children}</Breakpoint>);

// noinspection JSUnusedLocalSymbols - WebStorm gives wrong inspection
const Breakpoint: FC<PropsWithChildren<{ minWidth?: number, maxWidth?: number }>> = (props) => {
    let windowWidth = useWindowWidth();
    if (!windowWidth) return (<Loading></Loading>);
    
    return (props.minWidth !== undefined && windowWidth <= props.minWidth) || (props.maxWidth !== undefined && windowWidth > props.maxWidth)
        ? <></>
        : <>{props.children}</>;
}