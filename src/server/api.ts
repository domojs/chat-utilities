import * as di from 'akala-core';
import * as express from 'express';
import * as language from './language';

di.injectWithName(['$router'], function (router: express.IRouter)
{
    router.all('/api/ask', di.command(['interpreter', 'query.q', '$callback'], function (interpreter, query: string, callback)
    {
        console.log(query);
        interpreter(query, callback);
    }));
})();