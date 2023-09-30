export const TIME_ZONE = 'Africa/Lagos' as const;
export const CYPHER_ALGORITHM = 'aes-256-ctr' as const;

export const GRPC_LOADER_OPTIONS = {
  keepCase: false,
  defaults: true,
  arrays: true,
  objects: true,
  oneofs: true,
  json: true,
} as const;

export const logFiles = ['./log/logger.txt', './log/error.txt'] as const;

export const DOT_ENV_PATH = '../../.env' as const;
