"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountClientImpl = exports.AccountServiceName = exports.protobufPackage = void 0;
const _m0 = require("protobufjs/minimal");
const request_1 = require("./request");
const response_1 = require("./response");
exports.protobufPackage = "linkedin_clone.account";
exports.AccountServiceName = "linkedin_clone.account.Account";
class AccountClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || exports.AccountServiceName;
        this.rpc = rpc;
        this.Ping = this.Ping.bind(this);
    }
    Ping(request) {
        const data = request_1.PingRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Ping", data);
        return promise.then((data) => response_1.PingResponse.decode(_m0.Reader.create(data)));
    }
}
exports.AccountClientImpl = AccountClientImpl;
//# sourceMappingURL=account.js.map