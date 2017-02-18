"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var di = require("akala-core");
var debug = require("debug");
var akala = require("akala-server/dist/sharedcomponent");
var log = debug('domojs:chat');
var LanguageFactory = (function (_super) {
    __extends(LanguageFactory, _super);
    function LanguageFactory(config, bus) {
        return _super.call(this, config, bus) || this;
    }
    LanguageFactory.prototype.build = function () {
        return new Language(this.bus);
    };
    return LanguageFactory;
}(akala.ComponentFactory));
LanguageFactory = __decorate([
    di.factory("language", '$config', '$bus')
], LanguageFactory);
exports.LanguageFactory = LanguageFactory;
var Language = (function (_super) {
    __extends(Language, _super);
    function Language(bus) {
        return _super.call(this, 'language', bus) || this;
    }
    return Language;
}(akala.Component));
exports.Language = Language;
var KeywordInterpreter = (function () {
    function KeywordInterpreter() {
    }
    KeywordInterpreter.prototype.findInfo = function (collection, text) {
        log(collection);
        if (collection) {
            for (var item in collection) {
                log(item);
                for (var _i = 0, _a = collection[item]; _i < _a.length; _i++) {
                    var syno = _a[_i];
                    log(syno);
                    if (text.indexOf(syno) >= 0)
                        return item;
                }
            }
        }
    };
    ;
    KeywordInterpreter.prototype.register = function () {
        var self = this;
        di.injectWithName(['interpreters'], function (interpreters) {
            interpreters.push(function (context, next, callback) {
                try {
                    self.process(context, next, callback);
                }
                catch (ex) {
                    next({ message: ex.message, stack: ex.stack });
                }
            });
        })();
    };
    KeywordInterpreter.prototype.understand = function (cmd) {
        cmd.action = this.findInfo(this.actions, cmd.text);
        log('action: ' + cmd.action);
        cmd.keyword = this.findInfo(this.keywords, cmd.text);
        log('keywords: ' + cmd.keyword);
        cmd.other = this.findInfo(this.others, cmd.text);
        log('other: ' + cmd.other);
    };
    KeywordInterpreter.prototype.process = function (context, next, callback) {
        this.understand(context);
        if (!context.keyword)
            next();
        if (!context.deferred)
            this.execute(context, next, callback);
    };
    return KeywordInterpreter;
}());
exports.KeywordInterpreter = KeywordInterpreter;
;

//# sourceMappingURL=language.js.map
