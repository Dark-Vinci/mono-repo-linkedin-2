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

import { WorkExperience } from '@models';

@Injectable()
export class WorkExperiencesStore {
  private slaveRepositories: Undefinable<Repository<WorkExperience>[]>;

  public constructor(
    @InjectRepository(WorkExperience, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<WorkExperience>,

    @InjectRepository(WorkExperience, AuthDatabase.SLAVE1)
    slave1Repository: Repository<WorkExperience>,

    @InjectRepository(WorkExperience, AuthDatabase.SLAVE2)
    slave2Repository: Repository<WorkExperience>,

    @InjectRepository(WorkExperience, AuthDatabase.SLAVE3)
    slave3Repository: Repository<WorkExperience>,

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
  }: partialEntity<WorkExperience>): Promise<WorkExperience> {
    const workExperience = this.masterRepository.create(payload);

    await workExperience.save();

    return workExperience;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async softDelete({ id }: entityId<WorkExperience>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<WorkExperience>): Promise<Array<WorkExperience>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<WorkExperience> = {
      where: { ...(payload as unknown as FindOptionsWhere<WorkExperience>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get workExperience that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<WorkExperience>) => {
        return repo.find(findObj);
      },
    );

    const workExperiences = await Promise.any(findMap);

    return workExperiences;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<WorkExperience>): Promise<boolean> {
    // move all the update to the workExperience object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'workExperience id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(
    payload: Partial<WorkExperience>,
  ): Promise<WorkExperience> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one workExperience with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<WorkExperience>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const workExperience = await Promise.any(findMap);

    return workExperience;
  }
}
