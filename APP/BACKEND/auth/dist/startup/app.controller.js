"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const sdk_1 = require("sdk");
const _constants_1 = require("../constants");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async ping(payload) {
        const logger = sdk_1.MyLogger.setContext(_constants_1.fileNames.APP_SERVICE, _constants_1.appControllerMethods.PING, payload.requestId, global.logger, payload);
        logger.log('got a new ping request');
        const requestUUID = this.appService.ping(payload);
        logger.logPayload({ requestUUID: requestUUID.toJSON() }, sdk_1.Type.RESPONSE_RESPONSE);
        return { requestId: requestUUID.toString() };
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.GrpcMethod)(_constants_1.SERVICE_NAME, _constants_1.MethodName.PING),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "ping", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map