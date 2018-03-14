(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./store", "./dispatcher", "./actioncreator", "./createstore"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var store_1 = require("./store");
    exports.Store = store_1.default;
    var dispatcher_1 = require("./dispatcher");
    exports.Dispatcher = dispatcher_1.default;
    var actioncreator_1 = require("./actioncreator");
    exports.ActionCreator = actioncreator_1.ActionCreator;
    var createstore_1 = require("./createstore");
    exports.CreateStore = createstore_1.CreateStore;
});
//# sourceMappingURL=index.js.map