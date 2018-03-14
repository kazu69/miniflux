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
    var Store = /** @class */ (function () {
        function Store(reducer, initialState) {
            this.reducer = reducer;
            this.state = initialState;
        }
        Object.defineProperty(Store.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (state) {
                this._state = state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "reducer", {
            get: function () {
                return this._reducer;
            },
            set: function (reducer) {
                if (!reducer) {
                    throw Error("Reducer is nessesary.");
                }
                this._reducer = reducer;
            },
            enumerable: true,
            configurable: true
        });
        Store.prototype.reduce = function (action, handler, middlewear) {
            if (!this._reducer) {
                throw Error("store should has reducer");
            }
            var state = this.state;
            if (middlewear) {
                middlewear.call(null, state, action);
            }
            state = this.reducer.call(null, state, action);
            if (handler) {
                handler.call(null, state);
            }
            this.state = state;
            return state;
        };
        return Store;
    }());
    exports.default = Store;
});
//# sourceMappingURL=store.js.map