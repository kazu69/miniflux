(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ActionCreator(dispatcher) {
        var createAction = function (type) {
            if (!type) {
                throw new Error("Should provide action type property.");
            }
            else {
                return function (payload) {
                    return dispatcher.dispatch({ type: type, payload: payload });
                };
            }
        };
        var createSubscriber = function (store) {
            if (!store) {
                throw new Error("Should provide store.");
            }
            return dispatcher.register(store);
        };
        return { createAction: createAction, createSubscriber: createSubscriber };
    }
    exports.ActionCreator = ActionCreator;
});
//# sourceMappingURL=actioncreator.js.map