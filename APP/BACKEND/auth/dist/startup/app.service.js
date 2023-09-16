"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const helpers_1 = require("sdk/dist/helpers");
const constants_1 = require("sdk/dist/constants");
const _constants_1 = require("../constants");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    ping(payload) {
        const logger = helpers_1.MyLogger.setContext(_constants_1.fileNames.APP_SERVICE, _constants_1.appServiceMethods.PING, payload.requestId, global.logger, payload);
        try {
            const { requestId } = payload;
            const response = helpers_1.UUID.parse(requestId);
            logger.logPayload({ response: response.toJSON() }, constants_1.Type.RESPONSE_RESPONSE);
            return helpers_1.UUID.parse(requestId);
        }
        catch (error) {
            logger.error(error);
            throw new microservices_1.RpcException(error.message);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map