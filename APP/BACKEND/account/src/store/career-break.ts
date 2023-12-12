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
import { CareerBreak } from '@models';

@Injectable()
export class CareerBreakStore {
  private slaveRepositories: Undefinable<Repository<CareerBreak>[]>;

  public constructor(
    @InjectRepository(CareerBreak, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<CareerBreak>,

    @InjectRepository(CareerBreak, AuthDatabase.SLAVE1)
    slave1Repository: Repository<CareerBreak>,

    @InjectRepository(CareerBreak, AuthDatabase.SLAVE2)
    slave2Repository: Repository<CareerBreak>,

    @InjectRepository(CareerBreak, AuthDatabase.SLAVE3)
    slave3Repository: Repository<CareerBreak>,

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
  }: partialEntity<CareerBreak>): Promise<CareerBreak> {
    const careerBreak = this.masterRepository.create(payload);

    await careerBreak.save();

    return careerBreak;
  }

  public async softDelete({ id }: entityId<CareerBreak>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<CareerBreak>): Promise<Array<CareerBreak>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<CareerBreak> = {
      where: { ...(payload as unknown as FindOptionsWhere<CareerBreak>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get careerBreak that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<CareerBreak>) => {
        return repo.find(findObj);
      },
    );

    const careerBreaks = await Promise.any(findMap);

    return careerBreaks;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<CareerBreak>): Promise<boolean> {
    // move all the update to the careerBreak object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'careerBreak id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<CareerBreak>): Promise<CareerBreak> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one careerBreak with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<CareerBreak>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const careerBreak = await Promise.any(findMap);

    return careerBreak;
  }
}
