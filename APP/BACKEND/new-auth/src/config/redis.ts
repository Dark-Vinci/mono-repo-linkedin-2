import process from 'process';

export const RedisConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
  };
};
