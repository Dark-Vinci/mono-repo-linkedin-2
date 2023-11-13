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

import { Volunteering } from '@models';

@Injectable()
export class VolunteeringStore {
  private slaveRepositories: Undefinable<Repository<Volunteering>[]>;

  public constructor(
    @InjectRepository(Volunteering, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Volunteering>,

    @InjectRepository(Volunteering, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Volunteering>,

    @InjectRepository(Volunteering, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Volunteering>,

    @InjectRepository(Volunteering, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Volunteering>,

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
  }: partialEntity<Volunteering>): Promise<Volunteering> {
    const volunteering = this.masterRepository.create(payload);

    await volunteering.save();

    return volunteering;
  }

  public async softDelete({ id }: entityId<Volunteering>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Volunteering>): Promise<Array<Volunteering>> {
    const stringifiedPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Volunteering> = {
      where: { ...(payload as unknown as FindOptionsWhere<Volunteering>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get volunteering that matches ${stringifiedPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Volunteering>) => {
        return repo.find(findObj);
      },
    );

    const volunteerings = await Promise.any(findMap);

    return volunteerings;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Volunteering>): Promise<boolean> {
    // move all the update to the volunteering object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'volunteering id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<Volunteering>): Promise<Volunteering> {
    const stringifiedPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one volunteering with details ${stringifiedPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Volunteering>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const volunteering = await Promise.any(findMap);

    return volunteering;
  }
}
