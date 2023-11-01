import process from 'process';

export const MongoConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
  };
};
