"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImprovedError = void 0;
class ImprovedError extends Error {
    constructor(props) {
        super(props);
    }
    publicMessage() { }
    privateMessage() { }
}
exports.ImprovedError = ImprovedError;
//# sourceMappingURL=index.js.map