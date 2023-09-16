"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoder = exports.Hasher = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const bcrypt_1 = require("bcrypt");
const constants_1 = require("../constants");
class Hasher {
    constructor(round) {
        this.round = round;
    }
    async salter() {
        const salt = await (0, bcrypt_1.genSalt)(this.round);
        return salt;
    }
    async hash(value) {
        const salt = await this.salter();
        const hashed = await (0, bcrypt_1.hash)(value, salt);
        return hashed;
    }
    static async compare(password, hashed) {
        const isValid = await (0, bcrypt_1.compare)(password, hashed);
        return isValid;
    }
}
exports.Hasher = Hasher;
class Encoder {
    constructor(password, round) {
        this.password = password;
        this.round = round;
    }
    getRandomIV() {
        return (0, crypto_1.randomBytes)(16);
    }
    async salter() {
        const salt = await (0, bcrypt_1.genSalt)(this.round);
        return salt;
    }
    async getKey() {
        const salt = await this.salter();
        const key = (await (0, util_1.promisify)(crypto_1.scrypt)(this.password, salt, 32));
        return key;
    }
    async encode(text) {
        const iv = this.getRandomIV();
        const key = await this.getKey();
        const cipher = (0, crypto_1.createCipheriv)(constants_1.CYPHER_ALGORITHM, key, iv);
        const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
        return encryptedText.toString();
    }
    async decode(encryptedString) {
        const iv = this.getRandomIV();
        const key = await this.getKey();
        const decipher = (0, crypto_1.createDecipheriv)(constants_1.CYPHER_ALGORITHM, key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedString, 'ascii'),
            decipher.final(),
        ]);
        return decryptedText.toString();
    }
}
exports.Encoder = Encoder;
//# sourceMappingURL=hashing-encryption.js.map