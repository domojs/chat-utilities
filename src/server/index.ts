import * as akala from '@akala/server';
import * as vm from 'vm';
import * as url from 'url';
import * as path from 'path';
import * as chat from '@domojs/chat';

const debug = akala.log('domojs:chat:utilities');

akala.injectWithNameAsync(['$agent.api/chat'], function(client){
    
    akala.api.jsonrpcws(chat.meta).createServerProxy(client).register({ path: path.resolve(__dirname, './interpreter'), name: 'utilities' });
});
