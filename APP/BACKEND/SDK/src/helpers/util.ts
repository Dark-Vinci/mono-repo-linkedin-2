import { HttpStatus, Injectable } from '@nestjs/common';

import type { UUID } from './uuid';
import type {
  BaseResponse,
  ReturnT,
  SuccessResponse,
  Data,
  ErrorResponse,
  Error,
  Pagination,
} from '../types';
import { Message } from '../types';

@Injectable()
export class Util {
  public assert(expression: boolean, message: string): void | never {
    if (!expression) {
      throw new Error(message);
    }
  }

  private createSuccessResponse<DType = any>(
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

  private createFailureResponse(
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

  public generateResponse<
    T extends Error | Data,
    RType extends Record<string, never> = any,
  >(value: T, statusCode: HttpStatus, requestId: UUID): RType {
    // is data
    if (Reflect.has(value, 'payload')) {
      return this.createSuccessResponse(
        value as Data,
        statusCode,
        requestId,
      ) as any;
    }

    // isError
    return this.createFailureResponse(
      value as Error,
      statusCode,
      requestId,
    ) as any;
  }

  public paginate(size: number, totalCount: number, page: number): Pagination {
    const hasNext = size * page < totalCount;
    const hasPrev = page > 1;

    return {
      hasPrev,
      hasNext,
      size,
      currentPage: page,
      totalRecord: totalCount,
    } as Pagination;
  }

  public paginationOffset(size: number, page: number): number {
    return (page - 1) * size;
  }
}
