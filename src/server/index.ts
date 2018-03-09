import * as akala from '@akala/server';
import * as va from '@domojs/chat'
import * as vm from 'vm';
import * as url from 'url';
import * as path from 'path';
var debug = akala.log('domojs:chat:date');

akala.worker.createClient('chat').then(function (client)
{
    va.meta.createServerProxy(client).register({ path: path.resolve(__dirname, './interpreter'), name: 'date' });
});
