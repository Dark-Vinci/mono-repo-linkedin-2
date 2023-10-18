import process from 'process';

export const RedisConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  };
};
