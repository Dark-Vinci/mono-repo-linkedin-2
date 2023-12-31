import global from 'globals';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import {
  AuthDatabase,
  LoggerDecorator,
  Undefinable,
  Util,
  entityId,
  genericGet,
  partialEntity,
  updateEntity,
} from 'sdk';

import { User } from '@models';

@Injectable()
export class UserStore {
  private slaveRepositories: Undefinable<Repository<User>[]>;

  public constructor(
    @InjectRepository(User, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<User>,

    @InjectRepository(User, AuthDatabase.SLAVE1)
    slave1Repository: Repository<User>,

    @InjectRepository(User, AuthDatabase.SLAVE2)
    slave2Repository: Repository<User>,

    @InjectRepository(User, AuthDatabase.SLAVE3)
    slave3Repository: Repository<User>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<User>): Promise<User> {
    const user = this.masterRepository.create(payload);

    await user.save();

    return user;
  }

  @LoggerDecorator(global.logger, __filename)
  public async softDelete({ id }: entityId<User>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<User>): Promise<Array<User>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<User> = {
      where: { ...(payload as unknown as FindOptionsWhere<User>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get user that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<User>) => {
      return repo.find(findObj);
    });

    const users = await Promise.any(findMap);

    return users;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<User>): Promise<boolean> {
    // move all the update to the user object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'user id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<User>): Promise<User> {
    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one user with details ${JSON.stringify(payload)} or fail`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<User>) => {
      return repo.findOneOrFail(findOneOrFailOptions);
    });

    const user = await Promise.any(findMap);

    return user;
  }
}
