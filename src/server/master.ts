import * as chat from './language';
import * as akala from '@akala/server';
import { Connection } from '@akala/json-rpc-ws';
import * as ws from 'ws';

akala.injectWithName(['$router'], function (router: akala.HttpRouter)
{
    var interpreters: Connection[] = [];

    akala.api.buildServer(chat.meta, { jsonrpcws: '/api/chat' }, {
        register: function (language: chat.Language)
        {
            return new Promise<void>((resolve, reject) =>
            {
                akala.when(akala.map(interpreters, (connection) =>
                {
                    return this.$proxy(connection).receive(language);
                })).then(function () { resolve(); }, reject);
            });
        },
        registerAsInterpreter: function (dummy, connection: Connection)
        {
            var connectionIndex = interpreters.push(connection);
            if (connection.socket instanceof ws)
                connection.socket.on('close', function ()
                {
                    interpreters.splice(connectionIndex, 1);
                })
        }
    });
})();