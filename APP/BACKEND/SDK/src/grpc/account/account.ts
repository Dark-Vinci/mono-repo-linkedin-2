/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { PingRequest } from "./request";
import { PingResponse } from "./response";

export const protobufPackage = "linkedin_clone.account";

export interface Account {
  Ping(request: PingRequest): Promise<PingResponse>;
}

export const AccountServiceName = "linkedin_clone.account.Account";
export class AccountClientImpl implements Account {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || AccountServiceName;
    this.rpc = rpc;
    this.Ping = this.Ping.bind(this);
  }
  Ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Ping", data);
    return promise.then((data) => PingResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
