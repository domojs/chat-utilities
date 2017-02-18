"use strict";
var di = require("akala-core");
di.injectWithName(['$router'], function (router) {
    router.all('/api/ask', di.command(['interpreter', 'query.q', '$callback'], function (interpreter, query, callback) {
        console.log(query);
        interpreter(query, callback);
    }));
})();

//# sourceMappingURL=api.js.map
