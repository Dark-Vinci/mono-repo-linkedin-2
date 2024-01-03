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
  Ordering,
} from 'sdk';

import { Recommendation } from '@models';

@Injectable()
export class RecommendationStore {
  private slaveRepositories: Undefinable<Repository<Recommendation>[]>;

  public constructor(
    @InjectRepository(Recommendation, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Recommendation>,

    @InjectRepository(Recommendation, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Recommendation>,

    @InjectRepository(Recommendation, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Recommendation>,

    @InjectRepository(Recommendation, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Recommendation>,

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
  }: partialEntity<Recommendation>): Promise<Recommendation> {
    const project = this.masterRepository.create(payload);

    await project.save();

    return project;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async softDelete({ id }: entityId<Recommendation>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Recommendation>): Promise<Array<Recommendation>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Recommendation> = {
      where: { ...(payload as unknown as FindOptionsWhere<Recommendation>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: Ordering.ASC },
      comment: `get recommendation that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Recommendation>) => {
        return repo.find(findObj);
      },
    );

    const projects = await Promise.any(findMap);

    return projects;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Recommendation>): Promise<boolean> {
    // move all the update to the project object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'project id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(
    payload: Partial<Recommendation>,
  ): Promise<Recommendation> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one project with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<Recommendation>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const project = await Promise.any(findMap);

    return project;
  }
}
