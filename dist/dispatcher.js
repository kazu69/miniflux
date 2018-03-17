"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this._stores = [];
    }
    Dispatcher.prototype.register = function (store) {
        var _this = this;
        if (!store) {
            throw new Error("Should provide store.");
        }
        var handlers = [];
        var middlewears = [];
        var handler = function (data) {
            if (handlers.length <= 0) {
                return;
            }
            handlers.map(function (handler) {
                handler.call(_this, data);
            });
        };
        var middlewear = function (data, action) {
            if (middlewears.length <= 0) {
                return;
            }
            middlewears.map(function (enhancer) {
                enhancer.call(_this, data, action);
            });
        };
        var removeMiddlewear = function (middlewear) {
            var index = middlewears.indexOf(middlewear);
            return middlewears.splice(index, 1);
        };
        var unsubscribe = function (callback) {
            var index = handlers.indexOf(callback);
            return handlers.splice(index, 1);
        };
        var subscribe = function (callbacks, preload, enhancers) {
            if (enhancers === void 0) { enhancers = []; }
            callbacks.map(function (callbak) {
                handlers.push(callbak);
                if (preload !== false) {
                    callbak.call(_this, store.state);
                }
            });
            enhancers.map(function (enhancer) {
                middlewears.push(enhancer);
            });
            return { handlers: handlers, middlewears: middlewears };
        };
        this._stores.push({ store: store, handler: handler, middlewear: middlewear });
        return { subscribe: subscribe, unsubscribe: unsubscribe, removeMiddlewear: removeMiddlewear };
    };
    Dispatcher.prototype.unregister = function (store) {
        if (!store) {
            throw new Error("Should provide store.");
        }
        if (this._stores.length === 0) {
            return;
        }
        var index = this._stores.indexOf(store);
        this._stores.splice(index, 1);
    };
    Dispatcher.prototype.dispatch = function (action) {
        if (!action) {
            throw new Error("Should provide action.");
        }
        if (this._stores.length === 0) {
            return;
        }
        this._stores.map(function (item) {
            var store = item.store;
            var handler = item.handler;
            var middlewear = item.middlewear;
            store.reduce.call(store, action, handler, middlewear);
        });
    };
    Dispatcher.prototype.hasStore = function () {
        return this._stores.length > 0;
    };
    return Dispatcher;
}());
exports.default = Dispatcher;
//# sourceMappingURL=dispatcher.js.map