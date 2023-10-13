import global from 'globals';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      throw error;
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
      throw error;
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
        comment: 'get user by paination strategy',
      });

      return user;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
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
      });

      return user;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
    }
  }
}
