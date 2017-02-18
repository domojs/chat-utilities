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
var Sugar = require("sugar");
var language_1 = require("../../../chat/dist/server/language");
var UtilitiesInterpreter = (function (_super) {
    __extends(UtilitiesInterpreter, _super);
    function UtilitiesInterpreter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actions = { "which": ["quel", "quelle"], "is": ["est-ce"] };
        _this.keywords = { "temperature": ["temperature"], "time": ["heure"], "rain": ["va y avoir de la pluie", "qu'il va pleuvoir", "qu'il pleut"] };
        _this.others = { "useless": ["est-il", "fait-il", "fera-t-il"] };
        return _this;
    }
    UtilitiesInterpreter.prototype.execute = function (context, next, callback) {
        switch (context.keyword) {
            case 'time':
                callback('il est ' + Sugar.Date.format(new Date(), '{24hr}:{mm}'));
                break;
        }
    };
    UtilitiesInterpreter.prototype.understand = function (context) {
        _super.prototype.understand.call(this, context);
        if (context.keyword)
            context.deferred = false;
    };
    ;
    return UtilitiesInterpreter;
}(language_1.KeywordInterpreter));
exports.UtilitiesInterpreter = UtilitiesInterpreter;
new UtilitiesInterpreter().register();

//# sourceMappingURL=interpreter.js.map
