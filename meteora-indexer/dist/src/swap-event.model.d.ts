import { Document } from 'mongoose';
export declare class SwapEvent extends Document {
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
export declare const SwapEventSchema: import("mongoose").Schema<SwapEvent, import("mongoose").Model<SwapEvent, any, any, any, Document<unknown, any, SwapEvent, any> & SwapEvent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SwapEvent, Document<unknown, {}, import("mongoose").FlatRecord<SwapEvent>, {}> & import("mongoose").FlatRecord<SwapEvent> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
