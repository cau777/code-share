/**
 * @summary Test if a regex matches part of a string
 * @param str The string to search
 * @param regex The regex to apply
 * @param start The first index to search (inclusive)
 * @param end The last index to search (exclusive)
 */
export function regexTestRange(str: string, regex: RegExp, start: number = 0, end: number = str.length) {
    let sub = str.substring(start, end);
    return sub.match(regex) !== null;
}

/**
 * @summary counts how many times a pattern appears in part of a string (including overlaps)
 * @param str The string to search
 * @param pattern The pattern to search for
 * @param start The first index to search (inclusive)
 * @param end The last index to search (exclusive)
 */
export function countOccurrences(str: string, pattern: string, start: number = 0, end: number = str.length - pattern.length + 1): number {
    let count = 0;
    for (let i = start; i < end; i++) {
        let sub = str.substring(i, i+pattern.length);
        if (sub === pattern) count++;
    }
    return count;
}

/**
 * @summary searches for a pattern in part of a string
 * @param str The string to search
 * @param pattern The pattern to search for
 * @param start The first index to search (inclusive)
 * @param end The last index to search (exclusive)
 */
export function find(str: string, pattern: string, start: number = 0, end: number = str.length - pattern.length + 1): number | undefined {
    let targetLen = pattern.length;
    
    for (let i = start; i < end; i++) {
        if (str.substring(i, i+targetLen) === pattern) return i;
    }
    
    return undefined;
}

/**
 * @summary searches for a pattern in part of a string in reverse
 * @param str The string to search
 * @param pattern The pattern to search for
 * @param start The first index to search (inclusive)
 * @param end The last index to search (exclusive)
 */
export function findReversed(str: string, pattern: string, start: number = 0, end: number = str.length - pattern.length + 1): number | undefined {
    let targetLen = pattern.length;
    
    for (let i = end - 1; i >= start; i--) {
        if (str.substring(i, i + targetLen) === pattern) return i;
    }
    
    return undefined;
}

/**
 * @summary Escape characters that have special meaning in regular expressions
 * @param str The string to escape characters
 */
export function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
