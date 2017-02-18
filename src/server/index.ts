import { EventEmitter } from 'events';
import * as di from 'akala-core';
import * as fs from 'fs';
import * as $ from 'underscore';
import * as eachAsync from 'each-async';
import * as vm from 'vm';
import * as url from 'url';
import * as ajax from 'ajax-request-wrapper';
import * as util from 'util';
import './api';
import * as language from './language';
import * as akala from 'akala-server';

var debug = require('debug')('domojs:chat');

di.injectWithName(['$master'], function (master: (from?: string, masterPath?: string, workerPath?: string) => void)
{
    master(module.filename, './master', './language');

    new akala.SharedComponent<language.Language>('language').receive(function (language)
    {
        console.log(language);
        require(language.path);
    });
})();

export type Interpreter = (context: Context, next: (error?: any) => void, callback: (answer: string) => void) => void;

export interface Context
{
    text: string;
    timeStart?: number;
    time?: Date;
    timeEnd?: number;
    deferred?: boolean;
}

di.register('interpreter',
    function (text: string, callback: (status: number, text: string) => void)
    {
        var ctx = { text: text };
        var interpreters: Interpreter[] = di.resolve('interpreters');
        eachAsync(interpreters, function (interpreter, idx, next)
        {
            interpreter(ctx, next, function (text: string)
            {
                callback(200, text);
            });
        }, function (error)
            {
                if (error)
                    callback(500, error);
                else
                    callback(200, 'ok');
            })
    });

di.register('interpreters', []);