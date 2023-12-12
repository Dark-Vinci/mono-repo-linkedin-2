import global from 'globals';

import { Injectable } from '@nestjs/common';
import {
  AuthDatabase,
  entityId,
  LoggerDecorator,
  Ordering,
  partialEntity,
  Undefinable,
  updateEntity,
  Util,
  genericGet,
} from 'sdk';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { School } from '@models';

@Injectable()
export class SchoolStore {
  private slaveRepositories: Undefinable<Repository<School>[]>;

  public constructor(
    @InjectRepository(School, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<School>,

    @InjectRepository(School, AuthDatabase.SLAVE1)
    slave1Repository: Repository<School>,

    @InjectRepository(School, AuthDatabase.SLAVE2)
    slave2Repository: Repository<School>,

    @InjectRepository(School, AuthDatabase.SLAVE3)
    slave3Repository: Repository<School>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<School>): Promise<School> {
    const activity = this.masterRepository.create(payload);

    await activity.save();

    return activity;
  }

  public async softDelete({ id }: entityId<School>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<School>): Promise<Array<School>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<School> = {
      where: { ...(payload as unknown as FindOptionsWhere<School>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: Ordering.ASC },
      comment: `get activity that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<School>) => {
      return repo.find(findObj);
    });

    const activity = await Promise.any(findMap);

    return activity;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<School>): Promise<boolean> {
    // move all the update to the activity object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'activity id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<School>): Promise<School> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one activity with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<School>) => {
      return repo.findOneOrFail(findOneOrFailOptions);
    });

    const activity = await Promise.any(findMap);

    return activity;
  }
}
