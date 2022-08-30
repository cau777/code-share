import {FC, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

type Props = {
    text: string;
    triggerView?: boolean;
}

type State = {
    current: number;
    fixedWidth?: number;
    interval?: any;
    first: boolean;
}

const TextWriteAnimation: FC<Props> = (props) => {
    let len = props.text.length;
    let [state, setState] = useState<State>({current: len, first: true});
    
    let viewRef = undefined;
    if (props.triggerView) {
        [viewRef] = useInView({
            onChange: startWriteAnimation,
            triggerOnce: true
        });
    }
    
    let ref = useRef<HTMLDivElement>();
    
    function startWriteAnimation() {
        if (state.interval != undefined) return;
        
        let interval = setInterval(() => {
            setState(s => {
                if (s.interval === undefined) return s;
                if (s.current >= len - 1) {
                    clearInterval(s.interval);
                    return {current: len, first: false};
                }
                return {...s, current: s.current + 1};
            })
        }, 1000 / 8);
        
        let width = ref.current?.getBoundingClientRect().width;
        setState(() => ({interval, current: 1, fixedWidth: width, first: false}));
    }
    
    function endWriteAnimation() {
        clearInterval(state.interval);
        setState({current: len, first: false});
    }
    
    return (
        <span ref={viewRef}>
        {/* @ts-ignore */}
        <div onMouseEnter={startWriteAnimation} style={{minWidth: state.fixedWidth}} ref={ref}
             onMouseOut={endWriteAnimation}>{props.text.substring(0, state.current)}</div>
        </span>
    )
}

export default TextWriteAnimation;