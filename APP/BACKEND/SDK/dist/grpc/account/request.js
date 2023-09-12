"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingRequest = exports.protobufPackage = void 0;
const _m0 = require("protobufjs/minimal");
exports.protobufPackage = "linkedin_clone.account";
function createBasePingRequest() {
    return { requestId: "" };
}
exports.PingRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.requestId !== "") {
            writer.uint32(10).string(message.requestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePingRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.requestId = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { requestId: isSet(object.requestId) ? String(object.requestId) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.requestId !== "") {
            obj.requestId = message.requestId;
        }
        return obj;
    },
    create(base) {
        return exports.PingRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBasePingRequest();
        message.requestId = (_a = object.requestId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=request.js.map