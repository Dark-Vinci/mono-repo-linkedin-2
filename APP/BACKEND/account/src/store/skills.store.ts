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
  Undefinable,
  AuthDatabase,
  Util,
  LoggerDecorator,
  partialEntity,
  entityId,
  genericGet,
  updateEntity,
} from 'sdk';

import { Skill } from '@models';

@Injectable()
export class SkillStore {
  private slaveRepositories: Undefinable<Repository<Skill>[]>;

  public constructor(
    @InjectRepository(Skill, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<Skill>,

    @InjectRepository(Skill, AuthDatabase.SLAVE1)
    slave1Repository: Repository<Skill>,

    @InjectRepository(Skill, AuthDatabase.SLAVE2)
    slave2Repository: Repository<Skill>,

    @InjectRepository(Skill, AuthDatabase.SLAVE3)
    slave3Repository: Repository<Skill>,

    private readonly util: Util,
  ) {
    this.slaveRepositories = [
      slave3Repository,
      slave2Repository,
      slave1Repository,
    ];
  }

  @LoggerDecorator(global.logger, __filename)
  public async create({ payload }: partialEntity<Skill>): Promise<Skill> {
    const userSkill = this.masterRepository.create(payload);

    await userSkill.save();

    return userSkill;
  }

  public async softDelete({ id }: entityId<Skill>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<Skill>): Promise<Array<Skill>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<Skill> = {
      where: { ...(payload as unknown as FindOptionsWhere<Skill>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get skill that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<Skill>) => {
      return repo.find(findObj);
    });

    const skills = await Promise.any(findMap);

    return skills;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<Skill>): Promise<boolean> {
    // move all the update to the skill object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'skill id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<Skill>): Promise<Skill> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one skill with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map((repo: Repository<Skill>) => {
      return repo.findOneOrFail(findOneOrFailOptions);
    });

    const skill = await Promise.any(findMap);

    return skill;
  }
}
