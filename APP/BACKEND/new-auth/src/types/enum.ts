export enum RedisTimerType {
  EX = 'EX',
}

export enum AuthDatabase {
  MASTER = 'auth_master',
  SLAVE1 = 'auth_slave1',
  SLAVE2 = 'auth_slave2',
  SLAVE3 = 'auth_slave3',
}

export enum DBPassword {
  MASTER = 'dbMasterPassword',
  SLAVE = 'dbSlavePassword',
}

export enum ColumnType {
  VARCHAR = 'varchar',
  TIMESTAMP = 'timestamp',
  UUID = 'uuid',
  INT = 'int',
}

export enum Ordering {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EntityNames {
  USERS = 'users',
  BUSINESSES = 'businesses',
  ACTIVITIES = 'activities',
  EXPERIENCES = 'experiences',
  LICENSES = 'licenses',
  ORGANIZATIONS = 'organizations',
  SCHOOLS = 'schools',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  VOLUNTEERING = 'volunteering',
}
