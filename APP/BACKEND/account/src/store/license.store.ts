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
  Util,
  LoggerDecorator,
  partialEntity,
  entityId,
  genericGet,
  updateEntity,
  Undefinable,
} from 'sdk';

import { License } from '@models';

@Injectable()
export class LicenseStore {
  private slaveRepositories: Undefinable<Repository<License>[]>;

  public constructor(
    @InjectRepository(License, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<License>,

    @InjectRepository(License, AuthDatabase.SLAVE1)
    slave1Repository: Repository<License>,

    @InjectRepository(License, AuthDatabase.SLAVE2)
    slave2Repository: Repository<License>,

    @InjectRepository(License, AuthDatabase.SLAVE3)
    slave3Repository: Repository<License>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<License>): Promise<License> {
    const license = this.masterRepository.create(payload);

    await license.save();

    return license;
  }

  public async softDelete({ id }: entityId<License>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<License>): Promise<Array<License>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<License> = {
      where: { ...(payload as unknown as FindOptionsWhere<License>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get license that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<License>) => {
      return repo.find(findObj);
    });

    const users = await Promise.any(findMap);

    return users;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<License>): Promise<boolean> {
    // move all the update to the license object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'license id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<License>): Promise<License> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one license with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<License>) => {
      return repo.findOneOrFail(findOneOrFailOptions);
    });

    const license = await Promise.any(findMap);

    return license;
  }
}
