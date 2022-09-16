import {IconFC} from "./IconFC";

const CircleMask: IconFC = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
        <defs>
            <mask id="circleMask" x="0" y="0" width="16" height="16">
                <rect width="16" height="16" fill="white"/>
                <circle cx="8" cy="8" r="8" fill="black"/>
            </mask>
        </defs>
        
        <rect x="0" y="0" width="16" height="16" fill="currentColor" mask="url(#circleMask)"/>
    </svg>
)

export default CircleMask;