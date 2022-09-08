import config from "../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

export const AppName = "code->share";

let resolved = resolveConfig(config);

function parseWidth(text: string) {
    return Number.parseInt(text.substring(0, text.length-2)); // Remove -px and parse
}

const screens: any = resolved.theme!.screens;
export const SmScreen = parseWidth(screens.sm);
export const MdScreen = parseWidth(screens.md);
export const LgScreen = parseWidth(screens.lg);
export const XlScreen = parseWidth(screens.xl);