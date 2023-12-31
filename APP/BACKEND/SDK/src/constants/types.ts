export enum ServicePort {
  ACCOUNT = 3000,
  AUTH = 3000,
  GATEWAY = 3002,
}

export const ServiceProtoPath = {
  ACCOUNT: [
    '../SDK/src/grpc/account/account.proto',
    '../SDK/src/grpc/account/request.proto',
    '../SDK/src/grpc/account/response.proto',
  ],

  AUTH: [
    '../SDK/src/grpc/auth/auth.proto',
    '../SDK/src/grpc/auth/request.proto',
    '../SDK/src/grpc/auth/response.proto',
  ],
} as const;

export enum AppState {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export enum TerminationSignal {
  SIGINT = 'SIGINT',
  SIGTERM = 'SIGTERM',
  SIGHUP = 'SIGHUP',
}

export enum ClusterSignal {
  EXIT = 'exit',
}

export enum ServiceName {
  AUTH = 'auth',
  GATE = 'gate',
  ACCOUNT = 'account',
}

export enum Type {
  REQUEST_PAYLOAD = 'request_payload',
  RESPONSE_RESPONSE = 'response_payload',
}

export enum JoinColumnId {
  WORK_EXPERIENCE_ID = 'work_experience_id',
  SKILL_ID = 'skill_id',
  USER_ID = 'user_id',
}
