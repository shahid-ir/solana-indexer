import { AppService } from './app.service';
import { WebhookIndexerService } from './services/webhook-indexer.service';
export declare class AppController {
    private readonly appService;
    private readonly webhookIndexerService;
    constructor(appService: AppService, webhookIndexerService: WebhookIndexerService);
    getHello(): string;
    triggerPolling(): Promise<{
        message: string;
    }>;
    getHealth(): {
        status: string;
        timestamp: string;
    };
}
