"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.ServiceName = exports.ClusterSignal = exports.TerminationSignal = exports.AppState = exports.ServiceProtoPath = exports.ServicePort = void 0;
var ServicePort;
(function (ServicePort) {
    ServicePort[ServicePort["ACCOUNT"] = 3000] = "ACCOUNT";
    ServicePort[ServicePort["AUTH"] = 3001] = "AUTH";
    ServicePort[ServicePort["GATEWAY"] = 3002] = "GATEWAY";
})(ServicePort || (exports.ServicePort = ServicePort = {}));
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
})(AppState || (exports.AppState = AppState = {}));
var TerminationSignal;
(function (TerminationSignal) {
    TerminationSignal["SIGINT"] = "SIGINT";
    TerminationSignal["SIGTERM"] = "SIGTERM";
    TerminationSignal["SIGHUP"] = "SIGHUP";
})(TerminationSignal || (exports.TerminationSignal = TerminationSignal = {}));
var ClusterSignal;
(function (ClusterSignal) {
    ClusterSignal["EXIT"] = "exit";
})(ClusterSignal || (exports.ClusterSignal = ClusterSignal = {}));
var ServiceName;
(function (ServiceName) {
    ServiceName["AUTH"] = "auth";
    ServiceName["GATE"] = "gate";
    ServiceName["ACCOUNT"] = "account";
})(ServiceName || (exports.ServiceName = ServiceName = {}));
var Type;
(function (Type) {
    Type["REQUEST_PAYLOAD"] = "request_payload";
    Type["RESPONSE_RESPONSE"] = "response_payload";
})(Type || (exports.Type = Type = {}));
//# sourceMappingURL=types.js.map