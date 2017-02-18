import { KeywordInterpreter, KeywordContext } from '../../../chat/dist/server/language';
import { Context } from '../../../chat-date';
export declare type KeywordWithTimeContext = KeywordContext & Context;
export declare class UtilitiesInterpreter extends KeywordInterpreter {
    actions: {
        "which": string[];
        "is": string[];
    };
    keywords: {
        "temperature": string[];
        "time": string[];
        "rain": string[];
    };
    others: {
        "useless": string[];
    };
    execute(context: KeywordWithTimeContext, next: (error?: any) => void, callback: (answer: string) => void): void;
    understand(context: KeywordWithTimeContext): void;
}
