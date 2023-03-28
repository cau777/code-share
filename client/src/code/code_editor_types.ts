export type ModifierKeys ={
    alt: boolean;
    ctrl: boolean;
    shift: boolean;
}

// Used to operate on text based on the current programming language
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

// Used to describe a supported programming language manually
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

// Determines a code editor command, executed by a combination of keys, that modifies the normal behaviour of the TextArea
export type Command = {
    saveStateBefore?: boolean;
    saveStateAfter?: boolean;
    
    canExecute: (key: string, modifier: ModifierKeys) => boolean;
    perform: (target: HTMLTextAreaElement, extra: {options: LanguageOptions, key:  string}) => void;
}