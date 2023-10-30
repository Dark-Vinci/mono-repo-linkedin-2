import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';

import { MyLogger as Logger, Util, UUID } from 'sdk';

import { User } from '@models';
import { AuthDatabase, Undefinable } from '@types';

@Injectable()
export class UserRepository implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;
  private slaveRepositories: Undefinable<Repository<User>[]>;

  public constructor(
    // master connection
    @InjectRepository(User, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<User>,
    // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE1)
    userSlave1Repository: Repository<User>,
    // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE2)
    userSlave2Repository: Repository<User>,
    // // slave1 connection
    @InjectRepository(User, AuthDatabase.SLAVE3)
    userSlave3Repository: Repository<User>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      userSlave3Repository,
      userSlave2Repository,
      userSlave1Repository,
    ];
  }

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

  public async createUser(
    payload: Partial<User>,
    requestId: UUID,
  ): Promise<User> {
    const { globalLogger, masterRepository } = this;
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      globalLogger!,
      payload,
    );

    try {
      const user = masterRepository.create(payload);

      await user.save();

      return user;
    } catch (error: unknown) {
      logger.error(<Error>error);
      throw this.util.handleRepositoryError(<Error>error);
    }
  }

  public async softDelete(userId: UUID, requestId: UUID): Promise<void> {
    const { globalLogger, masterRepository } = this;
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      globalLogger!,
      { userId: userId.toString() },
    );

    try {
      await masterRepository.softDelete(userId.toString());

      return;
    } catch (error: unknown) {
      logger.error(<Error>error);
      throw this.util.handleRepositoryError(<Error>error);
    }
  }

  public async getUsers(
    payload: Partial<User>,
    requestId: UUID,
    paginateOptions: { skip: number; size: number },
  ): Promise<Array<User>> {
    const { globalLogger, slaveRepositories } = this;
    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      globalLogger!,
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

      const findMap = slaveRepositories!.map((repo: Repository<User>) => {
        return repo.find(findObj);
      });

      const users = await Promise.any(findMap);

      return users;
    } catch (error: unknown) {
      error = (error as { errors: Array<Error> }).errors[0] as Error;
      logger.error(<Error>error);
      this.util.handleRepositoryError(<Error>error);
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
    const { globalLogger, slaveRepositories } = this;

    const logger = Logger.setContext(
      __filename,
      'appControllerMethods.PING',
      requestId.toString(),
      globalLogger!,
      payload,
    );

    try {
      const findOneOrFailOptions = {
        where: {
          // ...payload,
        },

        comment: `find one user with details ${JSON.stringify(
          payload,
        )} or fail`,
      };

      const findMap = slaveRepositories!.map((repo: Repository<User>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      });

      const user = await Promise.any(findMap);

      return user;
    } catch (error: unknown) {
      logger.error(<Error>error);
      this.util.handleRepositoryError(<Error>error);
    }
  }
}
