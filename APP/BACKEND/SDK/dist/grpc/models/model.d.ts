import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "models";
export interface Page {
    size: number;
    page: number;
    sortBy: string;
    sortDirectionDesc: boolean;
}
export declare const Page: {
    encode(message: Page, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Page;
    fromJSON(object: any): Page;
    toJSON(message: Page): unknown;
    create<I extends {
        size?: number;
        page?: number;
        sortBy?: string;
        sortDirectionDesc?: boolean;
    } & {
        size?: number;
        page?: number;
        sortBy?: string;
        sortDirectionDesc?: boolean;
    } & { [K in Exclude<keyof I, keyof Page>]: never; }>(base?: I): Page;
    fromPartial<I_1 extends {
        size?: number;
        page?: number;
        sortBy?: string;
        sortDirectionDesc?: boolean;
    } & {
        size?: number;
        page?: number;
        sortBy?: string;
        sortDirectionDesc?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof Page>]: never; }>(object: I_1): Page;
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
