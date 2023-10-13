import global from 'globals';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import winston from 'winston';

import { MyLogger as Logger, UUID } from 'sdk';

import { User } from '@models';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly globalLogger: winston.Logger = global.logger,
  ) {}

  public async createUser(
    payload: Partial<User>,
    requestId: UUID,
  ): Promise<User> {
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      this.globalLogger,
      payload,
    );

    try {
      const user = this.userRepository.create(payload);

      await user.save();

      return user;
    } catch (error) {
      logger.error(<Error>error);
      throw HandleRepositoryError(error as any);
    }
  }

  public async softDelete(userId: UUID, requestId: UUID): Promise<void> {
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      this.globalLogger,
      { userId: userId.toString() },
    );

    try {
      await this.userRepository.softDelete(userId.toString());

      return;
    } catch (error) {
      logger.error(<Error>error);
      throw HandleRepositoryError(error as any);
    }
  }

  public async getUsers(
    payload: Partial<User>,
    requestId: UUID,
    paginateOptions: any,
  ): Promise<Array<User>> {
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      this.globalLogger,
      payload,
    );

    try {
      const user = await this.userRepository.find({
        where: {
          // ...payload,
        },

        take: paginateOptions.size,
        skip: paginateOptions.skip,

        order: { createdAt: 'ASC' },
        comment: `get user that matches ${JSON.stringify(
          payload,
        )} by paination strategy with requestId ${requestId.toString()}`,
      });

      return user;
    } catch (error) {
      logger.error(<Error>error);
      throw HandleRepositoryError(error as any);
    }
  }

  public async updateUser(
    userDetails: Partial<User>,
    update: Partial<User>,
    requestId: UUID,
  ): Promise<void> {
    console.log({ userDetails, update, requestId });
    return;
  }

  public async getUser(payload: Partial<User>, requestId: UUID): Promise<User> {
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      this.globalLogger,
      payload,
    );

    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          // ...payload,
        },

        comment: `find one user with details ${JSON.stringify(
          payload,
        )} or fail`,
      });

      return user;
    } catch (error) {
      logger.error(<Error>error);
      throw HandleRepositoryError(error as any);
    }
  }
}

export function HandleRepositoryError<
  T extends { new (...args: any[]): any; message: string },
>(error: T): void {
  switch (error.constructor) {
    case EntityNotFoundError:
      new NotFoundException('entity not found');
      break;
    case QueryFailedError:
      if (error.message.includes('duplicate key')) {
        new ConflictException('duplicate exist');
        break;
      }

      new InternalServerErrorException(
        'service is current unable to handle requests',
      );
      break;
    default:
      new InternalServerErrorException(
        'service is current unable to handle requests',
      );
  }
}
