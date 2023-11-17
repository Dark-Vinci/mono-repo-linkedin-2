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

import { Project } from '@models';

@Injectable()
export class ProjectStore {
  private slaveRepositories: Undefinable<Repository<Project>[]>;

  public constructor(
    @InjectRepository(Project, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Project>,

    @InjectRepository(Project, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Project>,

    @InjectRepository(Project, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Project>,

    @InjectRepository(Project, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Project>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<Project>): Promise<Project> {
    const project = this.masterRepository.create(payload);

    await project.save();

    return project;
  }

  public async softDelete({ id }: entityId<Project>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Project>): Promise<Array<Project>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Project> = {
      where: { ...(payload as unknown as FindOptionsWhere<Project>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get project that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<Project>) => {
      return repo.find(findObj);
    });

    const users = await Promise.any(findMap);

    return users;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Project>): Promise<boolean> {
    // move all the update to the project object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'project id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<Project>): Promise<Project> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one project with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<Project>) => {
      return repo.findOneOrFail(findOneOrFailOptions);
    });

    const project = await Promise.any(findMap);

    return project;
  }
}
