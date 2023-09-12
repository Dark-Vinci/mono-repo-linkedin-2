"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClientImpl = exports.AuthServiceName = exports.protobufPackage = void 0;
const _m0 = require("protobufjs/minimal");
const request_1 = require("./request");
const response_1 = require("./response");
exports.protobufPackage = "auth";
exports.AuthServiceName = "auth.Auth";
class AuthClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || exports.AuthServiceName;
        this.rpc = rpc;
        this.ping = this.ping.bind(this);
    }
    ping(request) {
        const data = request_1.PingRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ping", data);
        return promise.then((data) => response_1.PingResponse.decode(_m0.Reader.create(data)));
    }
}
exports.AuthClientImpl = AuthClientImpl;
//# sourceMappingURL=auth.js.map