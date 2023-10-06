import type { UUID } from './uuid';
import { HttpStatus } from '@nestjs/common';
import type {
  BaseResponse,
  ReturnT,
  SuccessResponse,
  Data,
  ErrorResponse,
  Error,
} from '../types';
import { Message } from '../types';

export function assert(expression: boolean, message: string): void {
  if (!expression) {
    throw new Error(message);
  }
}

function createSuccessResponse<DType = any>(
  data: Data<DType>,
  statusCode: HttpStatus,
  requestId: UUID,
): ReturnT<Data> {
  const base: BaseResponse = {
    timestamp: new Date(),
    requestId,
    statusCode,
  };

  const successResponse: SuccessResponse = {
    ...base,
    data,
    message: Message.SUCCESS,
  };

  return successResponse;
}

function createFailureResponse(
  error: Error,
  statusCode: HttpStatus,
  requestId: UUID,
): ReturnT<Error> {
  const base: BaseResponse = {
    timestamp: new Date(),
    requestId,
    statusCode,
  };

  const errorResponse: ErrorResponse = {
    ...base,
    message: Message.FAILURE,
    error,
  };

  return errorResponse;
}

export function response<
  T extends Error | Data,
  RType extends Record<string, never> = any,
>(value: T, statusCode: HttpStatus, requestId: UUID): RType {
  // is data
  if (Reflect.has(value, 'payload')) {
    return createSuccessResponse(value as Data, statusCode, requestId) as any;
  }

  // isError
  return createFailureResponse(value as Error, statusCode, requestId) as any;
}
