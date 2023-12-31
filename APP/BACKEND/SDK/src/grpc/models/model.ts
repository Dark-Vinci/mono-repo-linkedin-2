/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "models";

export interface Page {
  size: number;
  page: number;
  sortBy: string;
  sortDirectionDesc: boolean;
}

function createBasePage(): Page {
  return { size: 0, page: 0, sortBy: "", sortDirectionDesc: false };
}

export const Page = {
  encode(message: Page, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.size !== 0) {
      writer.uint32(8).int64(message.size);
    }
    if (message.page !== 0) {
      writer.uint32(16).int64(message.page);
    }
    if (message.sortBy !== "") {
      writer.uint32(26).string(message.sortBy);
    }
    if (message.sortDirectionDesc === true) {
      writer.uint32(32).bool(message.sortDirectionDesc);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Page {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.size = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.page = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sortBy = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sortDirectionDesc = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Page {
    return {
      size: isSet(object.size) ? Number(object.size) : 0,
      page: isSet(object.page) ? Number(object.page) : 0,
      sortBy: isSet(object.sortBy) ? String(object.sortBy) : "",
      sortDirectionDesc: isSet(object.sortDirectionDesc) ? Boolean(object.sortDirectionDesc) : false,
    };
  },

  toJSON(message: Page): unknown {
    const obj: any = {};
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.sortBy !== "") {
      obj.sortBy = message.sortBy;
    }
    if (message.sortDirectionDesc === true) {
      obj.sortDirectionDesc = message.sortDirectionDesc;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Page>, I>>(base?: I): Page {
    return Page.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Page>, I>>(object: I): Page {
    const message = createBasePage();
    message.size = object.size ?? 0;
    message.page = object.page ?? 0;
    message.sortBy = object.sortBy ?? "";
    message.sortDirectionDesc = object.sortDirectionDesc ?? false;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
