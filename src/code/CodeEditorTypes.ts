export type ModifierKeys ={
    alt: boolean;
    ctrl: boolean;
    shift: boolean;
}

export type LanguageOptions = {
    name: string;
    tab: string;
    autoIndent: boolean;
    keywords: string[];
    literals: string[];
    stringHighlight: boolean;
    numberHighlight: boolean;
    inlineComments?: string;
    multilineComments?: {start: string, end: string};
}

export type LanguageConfig = {
    inlineComments?: string;
    multilineComments?: {start: string, end: string};
    literals?: string[];
    keywords?: string[];
    accessModifiers?: boolean;
    disableAutoIndent?: boolean;
    disableStringHighlight?: boolean;
    disableNumberHighlight?: boolean;
    spacesNumber?: number;
}

export type Command = {
    saveStateBefore?: boolean;
    saveStateAfter?: boolean;
    
    canExecute: (key: string, modifier: ModifierKeys) => boolean;
    perform: (target: HTMLTextAreaElement, extra: {options: LanguageOptions, key:  string}) => void;
}