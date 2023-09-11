import { AuthPingRequest, AuthPingResponse, AuthService } from 'sdk/dist/grpc/auth';
import { AppService } from './app.service';
export declare class AppController implements AuthService {
    private readonly appService;
    constructor(appService: AppService);
    ping(payload: AuthPingRequest): Promise<AuthPingResponse>;
}
