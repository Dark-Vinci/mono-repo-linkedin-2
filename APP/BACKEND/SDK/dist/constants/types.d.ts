export declare enum ServicePort {
    ACCOUNT = 3000,
    AUTH = 3001,
    GATEWAY = 3002
}
export declare const ServiceProtoPath: {
    readonly ACCOUNT: readonly ["../SDK/src/grpc/account/account.proto", "../SDK/src/grpc/account/request.proto", "../SDK/src/grpc/account/response.proto"];
    readonly AUTH: readonly ["../SDK/src/grpc/auth/auth.proto", "../SDK/src/grpc/auth/request.proto", "../SDK/src/grpc/auth/response.proto"];
};
export declare enum AppState {
    PRODUCTION = "production",
    DEVELOPMENT = "development"
}
export declare enum TerminationSignal {
    SIGINT = "SIGINT",
    SIGTERM = "SIGTERM",
    SIGHUP = "SIGHUP"
}
export declare enum ClusterSignal {
    EXIT = "exit"
}
export declare enum ServiceName {
    AUTH = "auth",
    GATE = "gate",
    ACCOUNT = "account"
}
export declare enum Type {
    REQUEST_PAYLOAD = "request_payload",
    RESPONSE_RESPONSE = "response_payload"
}
