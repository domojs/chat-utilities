import * as akala from '@akala/server';
import * as va from '@domojs/chat';
import * as path from 'path';

export * from './interpreter'

akala.injectWithName(['$isModule'], function (isModule)
{
    if (isModule('@akala/chat-date'))
        akala.worker.createClient('chat').then((client) =>
        {
            va.meta.createServerProxy(client).register({ name: 'date', path: path.resolve(__dirname, './interpreter') });
        });
})
