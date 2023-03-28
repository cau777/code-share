import {FC, useRef, useState} from "react";
import {useEffectOnMount} from "../../src/hooks";

type Props = {
    text: string;
    triggerView?: boolean;
}

type State = {
    current: number;
    fixedWidth?: number;
    interval?: any;
}

// Animation component that acts like the text is being written in front of the user
const TextWriteAnimation: FC<Props> = (props) => {
    const len = props.text.length;
    const [state, setState] = useState<State>({current: len});
    const shouldTriggerOnView = useRef(props.triggerView);
    const viewRef = useRef<HTMLSpanElement>(null);
    
    useEffectOnMount(() => {
        function registerObserver() {
            if (typeof IntersectionObserver === "undefined")
                return;
    
            const observer = new IntersectionObserver(() => {
                if (shouldTriggerOnView.current)
                    startWriteAnimation();
                shouldTriggerOnView.current = false;
            }, {
                threshold: 0.9
            });
    
            if (viewRef.current)
                observer.observe(viewRef.current);
        }
    
        const handle = window.requestIdleCallback(registerObserver);
        return () => window.cancelIdleCallback(handle);
    });
    
    const ref = useRef<HTMLDivElement>(null);
    
    function startWriteAnimation() {
        if (state.interval != undefined) return;
    
        const interval = setInterval(() => {
            setState(s => {
                if (s.interval === undefined) return s;
                if (s.current >= len - 1) {
                    clearInterval(s.interval);
                    return {current: len, first: false};
                }
                return {...s, current: s.current + 1};
            })
        }, 1000 / 8);
    
        const width = ref.current?.getBoundingClientRect().width;
        setState(() => ({interval, current: 1, fixedWidth: width, first: false}));
    }
    
    function endWriteAnimation() {
        clearInterval(state.interval);
        setState({current: len});
    }
    
    return (
        <span ref={viewRef}>
            <div onMouseEnter={startWriteAnimation} style={{minWidth: state.fixedWidth}} ref={ref}
                 onMouseOut={endWriteAnimation}>{props.text.substring(0, state.current)}</div>
        </span>
    )
}

export default TextWriteAnimation;