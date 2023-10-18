import process from 'process';

export const DBConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  };
};
