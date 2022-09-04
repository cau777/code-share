export type ModifierKeys ={
    alt: boolean;
    ctrl: boolean;
    shift: boolean;
}

export type LanguageOptions = {
    name: string;
    tab: string;
    autoIndent: boolean;
    keywordsRegex?: RegExp;
    literalsRegex?: RegExp;
    numberRegex?: RegExp;
    stringHighlight: boolean;
    inlineCommentsRegex?: RegExp;
    multilineCommentsRegex?: RegExp;
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