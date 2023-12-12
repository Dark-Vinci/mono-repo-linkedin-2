import global from 'globals';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { SkillEndorsement } from '@models';
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

@Injectable()
export class SkillsEndorsementStore {
  private slaveRepositories: Undefinable<Repository<SkillEndorsement>[]>;

  public constructor(
    @InjectRepository(SkillEndorsement, AuthDatabase.MASTER)
    private readonly masterRepository: Repository<SkillEndorsement>,

    @InjectRepository(SkillEndorsement, AuthDatabase.SLAVE1)
    slave1Repository: Repository<SkillEndorsement>,

    @InjectRepository(SkillEndorsement, AuthDatabase.SLAVE2)
    slave2Repository: Repository<SkillEndorsement>,

    @InjectRepository(SkillEndorsement, AuthDatabase.SLAVE3)
    slave3Repository: Repository<SkillEndorsement>,

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
  }: partialEntity<SkillEndorsement>): Promise<SkillEndorsement> {
    const skillEndorsement = this.masterRepository.create(payload);

    await skillEndorsement.save();

    return skillEndorsement;
  }

  @LoggerDecorator(global.logger, __filename)
  public async softDelete({
    id,
  }: entityId<SkillEndorsement>): Promise<boolean> {
    await this.masterRepository.softDelete(id);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async genericGet({
    paginateOptions,
    payload,
    requestId,
  }: genericGet<SkillEndorsement>): Promise<Array<SkillEndorsement>> {
    const strPayload = JSON.stringify(payload);

    const findObj: FindManyOptions<SkillEndorsement> = {
      where: {
        ...(payload as unknown as FindOptionsWhere<SkillEndorsement>[]),
      },

      take: paginateOptions.size,
      skip: paginateOptions.skip,

      order: { createdAt: 'ASC' },
      comment: `get skillEndorsement that matches ${strPayload} by pagination strategy with requestId ${requestId}`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<SkillEndorsement>) => {
        return repo.find(findObj);
      },
    );

    const skillEndorsements = await Promise.any(findMap);

    return skillEndorsements;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async update({
    update,
    toBeUpdated,
  }: updateEntity<SkillEndorsement>): Promise<boolean> {
    // move all the update to the skillEndorsement object <-
    Object.assign(toBeUpdated, update);

    this.util.assert(!!toBeUpdated.id, 'skillEndorsement id is not provided');

    await this.masterRepository.update(toBeUpdated.id!, toBeUpdated);

    return true;
  }

  @LoggerDecorator(global.Logger, __filename)
  public async getOne(
    payload: Partial<SkillEndorsement>,
  ): Promise<SkillEndorsement> {
    const strPayload = JSON.stringify(payload);

    const findOneOrFailOptions: FindOneOptions = {
      where: { ...payload },

      comment: `find one skillEndorsement with details ${strPayload} or fail`,
    };

    const findMap = this.slaveRepositories!.map(
      (repo: Repository<SkillEndorsement>) => {
        return repo.findOneOrFail(findOneOrFailOptions);
      },
    );

    const skillEndorsement = await Promise.any(findMap);

    return skillEndorsement;
  }
}
