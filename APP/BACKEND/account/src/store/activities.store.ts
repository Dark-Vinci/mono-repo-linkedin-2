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

import { Activities } from '@models';

@Injectable()
export class ActivitiesStore {
  private slaveRepositories: Undefinable<Repository<Activities>[]>;

  public constructor(
    @InjectRepository(Activities, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Activities>,

    @InjectRepository(Activities, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Activities>,

    @InjectRepository(Activities, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Activities>,

    @InjectRepository(Activities, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Activities>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({
    payload,
  }: partialEntity<Activities>): Promise<Activities> {
    const activity = this.masterRepository.create(payload);

    await activity.save();

    return activity;
  }

  public async softDelete({ id }: entityId<Activities>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Activities>): Promise<Array<Activities>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Activities> = {
      where: { ...(payload as unknown as FindOptionsWhere<Activities>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get activity that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Activities>) => {
        return repo.find(findObj);
      },
    );

    const activities = await Promise.any(findMap);

    return activities;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Activities>): Promise<boolean> {
    // move all the update to the activity object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'activity id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<Activities>): Promise<Activities> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one activity with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Activities>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const activity = await Promise.any(findMap);

    return activity;
  }
}
