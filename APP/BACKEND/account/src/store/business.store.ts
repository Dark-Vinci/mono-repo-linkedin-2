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
  Util,
  Undefinable,
  AuthDatabase,
  LoggerDecorator,
  entityId,
  genericGet,
  partialEntity,
  updateEntity,
} from 'sdk';

import { Business } from '@models';

@Injectable()
export class BusinessStore {
  private slaveRepositories: Undefinable<Repository<Business>[]>;

  public constructor(
    @InjectRepository(Business, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Business>,

    @InjectRepository(Business, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Business>,

    @InjectRepository(Business, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Business>,

    @InjectRepository(Business, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Business>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<Business>): Promise<Business> {
    const business = this.masterRepository.create(payload);

    await business.save();

    return business;
  }

  @LoggerDecorator(global.logger, __filename)
  public async softDelete({ id }: entityId<Business>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Business>): Promise<Array<Business>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Business> = {
      where: { ...(payload as unknown as FindOptionsWhere<Business>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get business that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Business>) => {
        return repo.find(findObj);
      },
    );

    const businesses = await Promise.any(findMap);

    return businesses;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Business>): Promise<boolean> {
    // move all the update to the business object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'business id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<Business>): Promise<Business> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one business with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Business>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const business = await Promise.any(findMap);

    return business;
  }
}
