import { OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EvtSwapDecoderService } from './evt-swap-decoder.service';
export declare class WebhookIndexerService implements OnModuleInit {
    private readonly httpService;
    private readonly evtSwapDecoderService;
    private readonly logger;
    constructor(httpService: HttpService, evtSwapDecoderService: EvtSwapDecoderService);
    onModuleInit(): Promise<void>;
    private startEvtSwapIndexing;
    pollRecentTransactions(): Promise<void>;
    processTransaction(transaction: any, programId: string): Promise<void>;
}
