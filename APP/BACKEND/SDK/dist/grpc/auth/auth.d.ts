import { PingRequest } from "./request";
import { PingResponse } from "./response";
export declare const protobufPackage = "auth";
export interface Auth {
    ping(request: PingRequest): Promise<PingResponse>;
}
export declare const AuthServiceName = "auth.Auth";
export declare class AuthClientImpl implements Auth {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ping(request: PingRequest): Promise<PingResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
export {};
