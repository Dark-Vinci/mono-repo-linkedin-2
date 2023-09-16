import { AuthPingRequest, AuthPingResponse, AuthService } from 'sdk';
import { AppService } from './app.service';
export declare class AppController implements AuthService {
    private readonly appService;
    constructor(appService: AppService);
    ping(payload: AuthPingRequest): Promise<AuthPingResponse>;
}
