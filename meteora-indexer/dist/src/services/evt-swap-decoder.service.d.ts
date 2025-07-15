import { Model } from 'mongoose';
import { SwapEvent } from '../swap-event.model';
interface EvtSwapEvent {
    pool: string;
    config: string;
    tradeDirection: number;
    hasReferral: boolean;
    amountIn: string;
    minimumAmountOut: string;
    actualInputAmount: string;
    outputAmount: string;
    nextSqrtPrice: string;
    tradingFee: string;
    protocolFee: string;
    referralFee: string;
    transactionSignature: string;
}
export declare class EvtSwapDecoderService {
    private swapEventModel;
    private readonly logger;
    private readonly connection;
    private readonly SWAP_EVENT_DISCRIMINATOR;
    constructor(swapEventModel: Model<SwapEvent>);
    processTransaction(transaction: any): Promise<EvtSwapEvent[]>;
    private findEventDiscriminator;
    private decodeEvtSwapEventData;
    private scanTransactionForEvents;
    private saveEvtSwapEventToDatabase;
}
export {};
