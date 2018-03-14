(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./store"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var store_1 = require("./store");
    function CreateStore(reducer, initialState) {
        return new store_1.default(reducer, initialState);
    }
    exports.CreateStore = CreateStore;
});
//# sourceMappingURL=createstore.js.map