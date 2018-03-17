"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
function CreateStore(reducer, initialState) {
    return new store_1.default(reducer, initialState);
}
exports.CreateStore = CreateStore;
//# sourceMappingURL=createstore.js.map