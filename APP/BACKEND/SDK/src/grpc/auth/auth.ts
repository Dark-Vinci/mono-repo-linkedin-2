/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { PingRequest } from "./request";
import { PingResponse } from "./response";

export const protobufPackage = "auth";

export interface Auth {
  ping(request: PingRequest): Promise<PingResponse>;
}

export const AuthServiceName = "auth.Auth";
export class AuthClientImpl implements Auth {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AuthServiceName;
    this.rpc = rpc;
    this.ping = this.ping.bind(this);
  }
  ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ping", data);
    return promise.then((data) => PingResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
