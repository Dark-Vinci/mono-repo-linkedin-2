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
    static setContext(fileName, methodName, requestId, logger) {
        const logInstance = new MyLogger(logger);
        logInstance.fileName = fileName;
        logInstance.methodName = methodName;
        logInstance.requestId = requestId;
        logInstance.logger = logger;
        return logInstance;
    }
    log(message, ..._optionalParams) {
        this.logger.info({
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
    error(error, ..._optionalParams) {
        this.logger.error({
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            message: error.message,
            error,
        });
    }
    warn(message, ..._optionalParams) {
        this.logger.warn({
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
    debug(message, ..._optionalParams) {
        this.logger.debug({
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
    verbose(message, ..._optionalParams) {
        this.logger.verbose({
            fileName: this.fileName,
            methodName: this.methodName,
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=logger.js.map