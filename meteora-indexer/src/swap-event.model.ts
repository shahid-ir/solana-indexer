// meteora-indexer/src/swap-event.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SwapEvent extends Document {
  @Prop({ required: true, index: true }) pool: string;
  @Prop({ required: true, index: true }) config: string;
  @Prop({ required: true }) tradeDirection: number;
  @Prop({ required: true }) hasReferral: boolean;
  @Prop({ required: true }) amountIn: string;
  @Prop({ required: true }) minimumAmountOut: string;
  @Prop({ required: true }) actualInputAmount: string;
  @Prop({ required: true }) outputAmount: string;
  @Prop({ required: true }) nextSqrtPrice: string;
  @Prop({ required: true }) tradingFee: string;
  @Prop({ required: true }) protocolFee: string;
  @Prop({ required: true }) referralFee: string;
  @Prop({ required: true, index: true }) transactionSignature: string;
}

export const SwapEventSchema = SchemaFactory.createForClass(SwapEvent);

// Add compound indexes for common queries
SwapEventSchema.index({ pool: 1, transactionSignature: 1 });
SwapEventSchema.index({ transactionSignature: 1 }, { unique: true });