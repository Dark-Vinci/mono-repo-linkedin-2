"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceName = exports.ClusterSignal = exports.TerminationSignal = exports.AppState = exports.ServiceProtoPath = exports.ServicePort = void 0;
var ServicePort;
(function (ServicePort) {
    ServicePort[ServicePort["ACCOUNT"] = 3000] = "ACCOUNT";
    ServicePort[ServicePort["AUTH"] = 3001] = "AUTH";
    ServicePort[ServicePort["GATEWAY"] = 3002] = "GATEWAY";
})(ServicePort = exports.ServicePort || (exports.ServicePort = {}));
exports.ServiceProtoPath = {
    ACCOUNT: [
        '../SDK/src/grpc/account/account.proto',
        '../SDK/src/grpc/account/request.proto',
        '../SDK/src/grpc/account/response.proto',
    ],
    AUTH: [
        '../SDK/src/grpc/auth/auth.proto',
        '../SDK/src/grpc/auth/request.proto',
        '../SDK/src/grpc/auth/response.proto',
    ],
};
var AppState;
(function (AppState) {
    AppState["PRODUCTION"] = "production";
    AppState["DEVELOPMENT"] = "development";
})(AppState = exports.AppState || (exports.AppState = {}));
var TerminationSignal;
(function (TerminationSignal) {
    TerminationSignal["SIGINT"] = "SIGINT";
    TerminationSignal["SIGTERM"] = "SIGTERM";
    TerminationSignal["SIGHUP"] = "SIGHUP";
})(TerminationSignal = exports.TerminationSignal || (exports.TerminationSignal = {}));
var ClusterSignal;
(function (ClusterSignal) {
    ClusterSignal["EXIT"] = "exit";
})(ClusterSignal = exports.ClusterSignal || (exports.ClusterSignal = {}));
var ServiceName;
(function (ServiceName) {
    ServiceName["AUTH"] = "auth";
    ServiceName["GATE"] = "gate";
    ServiceName["ACCOUNT"] = "account";
})(ServiceName = exports.ServiceName || (exports.ServiceName = {}));
//# sourceMappingURL=types.js.map