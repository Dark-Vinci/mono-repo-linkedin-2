"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = exports.GlobalLogger = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
class GlobalLogger extends common_1.Logger {
    constructor(logFilePath, errorFilePath) {
        super();
        this.logFilePath = logFilePath;
        this.errorFilePath = errorFilePath;
        this.logger = (0, winston_1.createLogger)({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                new winston_1.transports.File({
                    filename: this.logFilePath,
                    level: 'info',
                }),
                new winston_1.transports.File({
                    filename: this.errorFilePath,
                    level: 'error',
                }),
            ],
        });
    }
    get getLogger() {
        return this.logger;
    }
}
exports.GlobalLogger = GlobalLogger;
class MyLogger {
    constructor(logger) {
        this.logger = logger;
    }
    setContext(fileName, methodName, requestId) {
        this.fileName = fileName;
        this.methodName = methodName;
        this.requestId = requestId;
    }
    log(message, ..._optionalParams) {
        const body = {
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timeStamp: new Date().toISOString(),
            message: message,
        };
        this.logger.info(JSON.stringify(body));
    }
    error(message, ..._optionalParams) {
        const body = {
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timeStamp: new Date().toISOString(),
            message: message,
        };
        this.logger.error(JSON.stringify(body));
    }
    warn(message, ..._optionalParams) {
        const body = {
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timeStamp: new Date().toISOString(),
            message: message,
        };
        this.logger.warn(JSON.stringify(body));
    }
    debug(message, ..._optionalParams) {
        const body = {
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timeStamp: new Date().toISOString(),
            message: message,
        };
        this.logger.debug(JSON.stringify(body));
    }
    verbose(message, ..._optionalParams) {
        const body = {
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timeStamp: new Date().toISOString(),
            message: message,
        };
        this.logger.verbose(JSON.stringify(body));
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=logger.js.map