import { OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EvtSwapDecoderService } from './evt-swap-decoder.service';
export declare class LaserStreamIntegrationService implements OnModuleInit {
    private readonly httpService;
    private readonly evtSwapDecoderService;
    private readonly logger;
    constructor(httpService: HttpService, evtSwapDecoderService: EvtSwapDecoderService);
    onModuleInit(): Promise<void>;
    private startEvtSwapPolling;
    private pollLaserStreamForTransactions;
    private fetchRecentTransactionsFromLaserStream;
    private processTransactionHash;
    processTransactionFromLaserStream(transactionData: any): Promise<void>;
    private getTransactionDetails;
}
