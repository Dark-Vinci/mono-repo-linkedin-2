import { PingRequest } from "./request";
import { PingResponse } from "./response";
export declare const protobufPackage = "linkedin_clone.account";
export interface Account {
    Ping(request: PingRequest): Promise<PingResponse>;
}
export declare const AccountServiceName = "linkedin_clone.account.Account";
export declare class AccountClientImpl implements Account {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Ping(request: PingRequest): Promise<PingResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
export {};
