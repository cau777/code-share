import {capitalize} from "./text";

// Uses Intl.RelativeTimeFormat to format a date more precisely
export function formatPostTime(dateStr: string, format: string) {
    const formatter = new Intl.RelativeTimeFormat(format);
    const date = new Date(dateStr);
    const millis = new Date().getTime() - date.getTime();
    
    const minutes = Math.round(millis / 1_000 / 60);
    if (minutes < 64)
        return capitalize(formatter.format(-minutes, "minutes"));
    
    const hours = Math.round(minutes / 60);
    if (hours < 24)
        return capitalize(formatter.format(-hours, "hours"));
    
    const days = Math.round(hours / 24);
    return capitalize(formatter.format(-days, "days"));
}