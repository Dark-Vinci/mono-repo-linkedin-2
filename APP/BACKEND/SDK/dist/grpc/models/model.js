"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.protobufPackage = void 0;
const _m0 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = "models";
function createBasePage() {
    return { size: 0, page: 0, sortBy: "", sortDirectionDesc: false };
}
exports.Page = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.size !== 0) {
            writer.uint32(8).int64(message.size);
        }
        if (message.page !== 0) {
            writer.uint32(16).int64(message.page);
        }
        if (message.sortBy !== "") {
            writer.uint32(26).string(message.sortBy);
        }
        if (message.sortDirectionDesc === true) {
            writer.uint32(32).bool(message.sortDirectionDesc);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.size = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.page = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.sortBy = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.sortDirectionDesc = reader.bool();
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
        return {
            size: isSet(object.size) ? Number(object.size) : 0,
            page: isSet(object.page) ? Number(object.page) : 0,
            sortBy: isSet(object.sortBy) ? String(object.sortBy) : "",
            sortDirectionDesc: isSet(object.sortDirectionDesc) ? Boolean(object.sortDirectionDesc) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.size !== 0) {
            obj.size = Math.round(message.size);
        }
        if (message.page !== 0) {
            obj.page = Math.round(message.page);
        }
        if (message.sortBy !== "") {
            obj.sortBy = message.sortBy;
        }
        if (message.sortDirectionDesc === true) {
            obj.sortDirectionDesc = message.sortDirectionDesc;
        }
        return obj;
    },
    create(base) {
        return exports.Page.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBasePage();
        message.size = (_a = object.size) !== null && _a !== void 0 ? _a : 0;
        message.page = (_b = object.page) !== null && _b !== void 0 ? _b : 0;
        message.sortBy = (_c = object.sortBy) !== null && _c !== void 0 ? _c : "";
        message.sortDirectionDesc = (_d = object.sortDirectionDesc) !== null && _d !== void 0 ? _d : false;
        return message;
    },
};
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=model.js.map