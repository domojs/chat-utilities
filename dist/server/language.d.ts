import * as akala from 'akala-server/dist/sharedcomponent';
export declare class LanguageFactory extends akala.ComponentFactory<Language> {
    constructor(config: any, bus?: SocketIO.Socket);
    build(): Language;
}
export declare class Language extends akala.Component {
    constructor(bus?: SocketIO.Socket);
    path: string;
    name: string;
}
export declare type Interpreter = (context: Context, next: (error?: any) => void, callback: (answer: string) => void) => void;
export interface Context {
    text: string;
    deferred?: boolean;
}
export interface KeywordContext extends Context {
    action: string;
    keyword: string;
    other: string;
}
export interface Map<V> {
    [key: string]: V;
}
export declare abstract class KeywordInterpreter {
    constructor();
    findInfo(collection: Map<string[]>, text: string): string;
    register(): void;
    protected actions: Map<string[]>;
    protected keywords: Map<string[]>;
    protected others: Map<string[]>;
    understand(cmd: KeywordContext): void;
    process(context: KeywordContext, next: (error?: any) => void, callback: (answer: string) => void): void;
    abstract execute(context: KeywordContext, next: (error?: any) => void, callback: (answer: string) => void): any;
}
