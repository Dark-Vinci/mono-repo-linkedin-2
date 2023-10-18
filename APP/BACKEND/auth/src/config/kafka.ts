import process from 'process';

export const KafkaConfig = () => {
  return {
    AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  };
};
