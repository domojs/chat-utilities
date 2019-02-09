import * as Sugar from 'sugar';
// import * as Weather from '../../../weather';
import { KeywordInterpreter, KeywordContext, Interpreter } from '../../../chat/dist/server/language';
import { Context } from '../../../chat-date';

export type KeywordWithTimeContext = KeywordContext & Context;

export class UtilitiesInterpreter extends KeywordInterpreter
{
    actions = { "which": ["quel", "quelle"], "is": ["est-ce"] };
    keywords = { "temperature": ["temperature"], "time": ["heure"], "rain": ["va y avoir de la pluie", "qu'il va pleuvoir", "qu'il pleut"] };
    others = { "useless": ["est-il", "fait-il", "fera-t-il"] };

    public execute(context: KeywordWithTimeContext, next: (error?: any) => void, callback: (answer: string) => void)
    {
        switch (context.keyword)
        {
            case 'time':
                callback('il est ' + Sugar.Date.format(new Date(), '{24hr}:{mm}'));
                break;
        }
    }

    public understand(context: KeywordWithTimeContext)
    {
        super.understand(context);
        if (context.keyword)
            context.deferred = false;
    };
}

new UtilitiesInterpreter().register();