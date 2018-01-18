import * as akala from '@akala/server';
import * as vm from 'vm';
import * as url from 'url';
import * as path from 'path';
import * as va from './language';

var debug = akala.log('domojs:chat');

akala.worker.createClient('chat').then(function (client)
{
    va.meta.createServerProxy(client).register({ path: path.resolve(__dirname, './interpreter'), name: 'utilities' });
});
