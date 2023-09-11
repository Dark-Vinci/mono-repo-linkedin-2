"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const crypto_1 = require("crypto");
const constants_1 = require("../constants");
class UUID {
    constructor(uuid) {
        this.zeroUUID = constants_1.zeroUUID;
        if (!UUID.isValidUUID(uuid)) {
            throw new Error('Invalid UUID format');
        }
        this.value = uuid;
    }
    static new() {
        return new UUID((0, crypto_1.randomUUID)());
    }
    static nil() {
        return new UUID(constants_1.zeroUUID);
    }
    static parse(uuid) {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidPattern.test(uuid)) {
            throw new Error('not a valid UUID string');
        }
        return new UUID(uuid);
    }
    static isValidUUID(uuid) {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(uuid);
    }
    toString() {
        if (!this.value) {
            return this.zeroUUID;
        }
        return this.value;
    }
    toJSON() {
        if (!this.value) {
            return this.zeroUUID;
        }
        return this.value;
    }
    static fromJSON(jsonString) {
        return new UUID(jsonString);
    }
    static reviver(_key, value) {
        if (typeof value === TypeOF.STRING && UUID.isValidUUID(value)) {
            return UUID.fromJSON(value);
        }
        if (typeof value === TypeOF.OBJECT && value !== null) {
            for (const prop in value) {
                if (Object.prototype.hasOwnProperty.call(value, prop)) {
                    value[prop] = UUID.reviver(prop, value[prop]);
                }
            }
        }
        return value;
    }
}
exports.UUID = UUID;
//# sourceMappingURL=uuid.js.map