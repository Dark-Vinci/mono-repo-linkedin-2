import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';

import { MyLogger as Logger, Util, UUID } from 'sdk';

import { User } from '@models';
import { AuthDatabase } from '@types';

@Injectable()
export class UserRepository implements OnApplicationBootstrap {
  private globalLogger: WinstonLogger | any;

  public constructor(
    // master connection
    @InjectRepository(User, AuthDatabase.MASTER)
    private readonly userMasterRepository: Repository<User>,
    // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE1)
    private readonly userSlave1Repository: Repository<User>,
    // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE2)
    private readonly userSlave2Repository: Repository<User>,
    // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE3)
    private readonly userSlave3Repository: Repository<User>,

    private readonly util: Util,
  ) { }

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

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
      const user = this.userMasterRepository.create(payload);

      await user.save();

      return user;
    } catch (error) {
      logger.error(<Error> error);
      throw this.util.handleRepositoryError(error as any);
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
      await this.userMasterRepository.softDelete(userId.toString());

      return;
    } catch (error) {
      logger.error(<Error> error);
      throw this.util.handleRepositoryError(error as any);
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
      const findObj: FindManyOptions<User> = {
        where: {
          // ...payload,
        },

        take: paginateOptions.size,
        skip: paginateOptions.skip,

        order: { createdAt: 'ASC' },
        comment: `get user that matches ${JSON.stringify(
          payload,
        )} by pagination strategy with requestId ${requestId.toString()}`,
      };

      const user = await Promise.any([
        this.userSlave1Repository.find(findObj),
        this.userSlave2Repository.find(findObj),
        this.userSlave3Repository.find(findObj),
      ]);

      return user;
    } catch (error: any) {
      error = error.errors[0] as Error;
      logger.error(error);
      this.util.handleRepositoryError(error);
    }
  }

  public async updateUser(
    userDetails: Partial<User>,
    update: Partial<User>,
    requestId: UUID,
  ): Promise<void> {
    // userDetails = userDetails as FindOptionsWhere<User>;

    // const user = await this.userSlave1Repository.find({
    //   where: {
    //     ...userDetails
    //   }
    // }),
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
      const user = await this.userSlave1Repository.findOneOrFail({
        where: {
          // ...payload,
        },

        comment: `find one user with details ${JSON.stringify(
          payload,
        )} or fail`,
      });

      return user;
    } catch (error) {
      logger.error(<Error> error);
      this.util.handleRepositoryError(error as any);
    }
  }
}
