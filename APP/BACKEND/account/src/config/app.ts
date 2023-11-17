import process from 'process';

export const AppCoreConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_NOT_BEFORE: process.env.JWT_NOT_BEFORE,
    BCRYPT_ROUND: process.env.BCRYPT_ROUND,
  };
};
