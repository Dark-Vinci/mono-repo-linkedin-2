import { HttpStatus } from '@nestjs/common';
import { UUID } from '@helpers';

type Nullable<T> = T | null;

export interface Data<TPayload = any> {
  readonly pagination: Nullable<Pagination>;
  readonly payload: TPayload;
}

export interface Error {
  readonly publicMessage: string;
  readonly privateMessage: string;
}

export enum Message {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface Pagination {
  readonly totalRecord: number;
  readonly currentPage: number;
  readonly size: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export type MessageType = Lowercase<keyof typeof Message>;

export interface BaseResponse {
  readonly timestamp: Date;
  readonly statusCode: HttpStatus;
  readonly requestId: UUID;
}

export interface SuccessResponse<T extends MessageType = 'success'>
  extends BaseResponse {
  readonly message: T;
  readonly data: Data;
}

export interface ErrorResponse<T extends MessageType = 'failure'>
  extends BaseResponse {
  readonly error: Error;
  readonly message: T;
}

export type ReturnT<T extends Data | Error> = T extends Error
  ? ErrorResponse
  : SuccessResponse;
