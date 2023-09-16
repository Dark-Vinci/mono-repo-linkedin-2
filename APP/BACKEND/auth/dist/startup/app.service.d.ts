import { UUID } from 'sdk/dist/helpers';
import { AuthPingRequest } from 'sdk/dist/grpc/auth';
export declare class AppService {
    getHello(): string;
    ping(payload: AuthPingRequest): UUID;
}
