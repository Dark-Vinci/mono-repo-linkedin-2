import process from 'process';

export const AppCoreConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  };
};
