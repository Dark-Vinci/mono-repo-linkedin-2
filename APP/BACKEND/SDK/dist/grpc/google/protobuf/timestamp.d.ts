import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "google.protobuf";
export interface Timestamp {
    seconds: number;
    nanos: number;
}
export declare const Timestamp: {
    encode(message: Timestamp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Timestamp;
    fromJSON(object: any): Timestamp;
    toJSON(message: Timestamp): unknown;
    create<I extends {
        seconds?: number;
        nanos?: number;
    } & {
        seconds?: number;
        nanos?: number;
    } & { [K in Exclude<keyof I, keyof Timestamp>]: never; }>(base?: I): Timestamp;
    fromPartial<I_1 extends {
        seconds?: number;
        nanos?: number;
    } & {
        seconds?: number;
        nanos?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Timestamp>]: never; }>(object: I_1): Timestamp;
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
