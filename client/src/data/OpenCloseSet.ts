/**
 * @summary A utility class to store pairs of strings
 */
export default class OpenCloseSet {
    public readonly elements: [string, string][];
    
    public constructor(elements: [string, string][]) {
        this.elements = elements;
    }
    
    public isOpenCharacter(char: string) {
        for (const [open] of this.elements) {
            if (char === open) return true;
        }
        return false;
    }
    
    public isCloseCharacter(char: string) {
        for (const [, close] of this.elements) {
            if (char === close) return true;
        }
        return false;
    }
    
    public findCloseCharacter(openChar: string) {
        for (const [open, close] of this.elements) {
            if (open === openChar) return close;
        }
        return "";
    }
    
    public findOpenCharacter(closeChar: string) {
        for (const [open, close] of this.elements) {
            if (close === closeChar) return open;
        }
        return "";
    }
}