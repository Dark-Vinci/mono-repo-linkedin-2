import process from 'process';

export const KafkaConfig = () => {
  return {
    ACCOUNT_MASTER_PASSWORD: process.env.ACCOUNT_MASTER_PASSWORD,
  };
};
