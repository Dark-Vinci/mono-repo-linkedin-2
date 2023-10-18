import process from 'process';

export const MongoConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  };
};
