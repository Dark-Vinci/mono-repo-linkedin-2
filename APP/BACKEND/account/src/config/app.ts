import process from 'process';

export const AppCoreConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
  };
};
