"use strict";
var di = require("akala-core");
var eachAsync = require("each-async");
require("./api");
var akala = require("akala-server");
var debug = require('debug')('domojs:chat');
di.injectWithName(['$master'], function (master) {
    master(module.filename, './master', './language');
    new akala.SharedComponent('language').receive(function (language) {
        console.log(language);
        require(language.path);
    });
})();
di.register('interpreter', function (text, callback) {
    var ctx = { text: text };
    var interpreters = di.resolve('interpreters');
    eachAsync(interpreters, function (interpreter, idx, next) {
        interpreter(ctx, next, function (text) {
            callback(200, text);
        });
    }, function (error) {
        if (error)
            callback(500, error);
        else
            callback(200, 'ok');
    });
});
di.register('interpreters', []);

//# sourceMappingURL=index.js.map
