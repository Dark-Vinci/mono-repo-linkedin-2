import process from 'process';

export const JWTConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
    EXPIRES_IN: process.env.EXPIRES_IN,
    ISSUER: process.env.ISSUER,
    NOT_BEFORE: process.env.NOT_BEFORE,
    JWT_SECRET: process.env.JWT_SECRET,
  };
};
