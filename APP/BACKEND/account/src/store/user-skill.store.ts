import global from 'globals';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { UserSkills } from '@models';
import {
  AuthDatabase,
  entityId,
  LoggerDecorator,
  partialEntity,
  Undefinable,
  updateEntity,
  Util,
  genericGet,
} from 'sdk';

@Injectable()
export class UserSkillStore {
  private slaveRepositories: Undefinable<Repository<UserSkills>[]>;

  public constructor(
    @InjectRepository(UserSkills, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<UserSkills>,

    @InjectRepository(UserSkills, AuthDatabase.SLAVE1)
    slave1Repository: Repository<UserSkills>,

    @InjectRepository(UserSkills, AuthDatabase.SLAVE2)
    slave2Repository: Repository<UserSkills>,

    @InjectRepository(UserSkills, AuthDatabase.SLAVE3)
    slave3Repository: Repository<UserSkills>,

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
  }: partialEntity<UserSkills>): Promise<UserSkills> {
    const userSkill = this.masterRepository.create(payload);

    await userSkill.save();

    return userSkill;
  }

  public async softDelete({ id }: entityId<UserSkills>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<UserSkills>): Promise<Array<UserSkills>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<UserSkills> = {
      where: { ...(payload as unknown as FindOptionsWhere<UserSkills>[]) },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get userSkill that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<UserSkills>) => {
        return repo.find(findObj);
      },
    );

    const userSkills = await Promise.any(findMap);

    return userSkills;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<UserSkills>): Promise<boolean> {
    // move all the update to the userSkill object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'userSkill id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(payload: Partial<UserSkills>): Promise<UserSkills> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one userSkill with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<UserSkills>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const userSkill = await Promise.any(findMap);

    return userSkill;
  }
}
