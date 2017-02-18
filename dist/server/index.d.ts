import './api';
export declare type Interpreter = (context: Context, next: (error?: any) => void, callback: (answer: string) => void) => void;
export interface Context {
    text: string;
    timeStart?: number;
    time?: Date;
    timeEnd?: number;
    deferred?: boolean;
}
