import process from 'process';

export const DBConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
  };
};
