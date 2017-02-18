import * as di from 'akala-core';
import * as debug from 'debug';
import * as express from 'express';
var log = debug('domojs:asset');
import * as va from './language';
import * as io from 'socket.io';
import * as $ from 'underscore';
import * as fs from 'fs';
import * as akala from 'akala-server';

new akala.SharedComponent<va.Language>('language').registerMaster();
