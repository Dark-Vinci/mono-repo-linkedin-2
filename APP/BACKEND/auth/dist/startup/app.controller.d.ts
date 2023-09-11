import { AppService } from './app.service';
import { AuthPingRequest, AuthPingResponse, AuthService } from 'sdk/dist/grpc/auth';
export declare class AppController implements AuthService {
    private readonly appService;
    constructor(appService: AppService);
    ping(payload: AuthPingRequest): Promise<AuthPingResponse>;
}
