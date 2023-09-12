import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "auth";
export interface PingResponse {
    requestId: string;
}
export declare const PingResponse: {
    encode(message: PingResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse;
    fromJSON(object: any): PingResponse;
    toJSON(message: PingResponse): unknown;
    create<I extends {
        requestId?: string;
    } & {
        requestId?: string;
    } & { [K in Exclude<keyof I, "requestId">]: never; }>(base?: I): PingResponse;
    fromPartial<I_1 extends {
        requestId?: string;
    } & {
        requestId?: string;
    } & { [K_1 in Exclude<keyof I_1, "requestId">]: never; }>(object: I_1): PingResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
