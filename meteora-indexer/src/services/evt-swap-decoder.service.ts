import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from '@solana/web3.js';
import bs58 from 'bs58';
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

@Injectable()
export class EvtSwapDecoderService {
  private readonly logger = new Logger(EvtSwapDecoderService.name);
  private readonly connection: Connection;
  private readonly SWAP_EVENT_DISCRIMINATOR = Buffer.from([27, 60, 21, 213, 138, 170, 187, 147]);

  constructor(
    @InjectModel(SwapEvent.name) private swapEventModel: Model<SwapEvent>,
  ) {
    this.connection = new Connection('https://mainnet.helius-rpc.com/?api-key=29c1bedf-6af2-4f78-bdf5-bf4765e0a741');
  }

  public async processTransaction(transaction: any): Promise<EvtSwapEvent[]> {
    if (!transaction) {
      this.logger.warn(`❌ No transaction provided to process`);
      return [];
    }

    if (!transaction.meta) {
      this.logger.warn(`❌ Transaction has no meta data: ${transaction.signature || 'Unknown'}`);
      return [];
    }

    const events = this.scanTransactionForEvents(transaction);
    
    if (events.length === 0) {
      this.logger.warn(`❌ No EvtSwap events found for transaction: ${transaction.signature || 'Unknown'}`);
      return [];
    }

    // Save events to database
    for (const event of events) {
      await this.saveEvtSwapEventToDatabase(event);
    }

    this.logger.log(`✅ Successfully processed ${events.length} EvtSwap events for transaction ${transaction.signature || 'Unknown'}`);
    return events;
  }

  private findEventDiscriminator(data: Buffer): { type: string; offset: number } | null {
    for (let offset = 0; offset <= data.length - 8; offset++) {
      const potentialDiscriminator = data.subarray(offset, offset + 8);
      if (potentialDiscriminator.equals(this.SWAP_EVENT_DISCRIMINATOR)) {
        return { type: 'EvtSwap', offset };
      }
    }
    return null;
  }

  private decodeEvtSwapEventData(eventData: Buffer, transaction: any): EvtSwapEvent | null {
    try {
      let offset = 0;
      
      // Pool (PublicKey - 32 bytes)
      if (eventData.length < offset + 32) {
        throw new Error(`Insufficient data for pool: need 32 bytes, have ${eventData.length - offset}`);
      }
      const pool = eventData.subarray(offset, offset + 32);
      offset += 32;
      
      // Config (PublicKey - 32 bytes)
      if (eventData.length < offset + 32) {
        throw new Error(`Insufficient data for config: need 32 bytes, have ${eventData.length - offset}`);
      }
      const config = eventData.subarray(offset, offset + 32);
      offset += 32;
      
      // Trade Direction (u8 - 1 byte)
      if (eventData.length < offset + 1) {
        throw new Error(`Insufficient data for trade direction: need 1 byte, have ${eventData.length - offset}`);
      }
      const tradeDirection = eventData[offset];
      offset += 1;
      
      // Has Referral (bool - 1 byte)
      if (eventData.length < offset + 1) {
        throw new Error(`Insufficient data for has referral: need 1 byte, have ${eventData.length - offset}`);
      }
      const hasReferral = eventData[offset] === 1;
      offset += 1;
      
      // SwapParameters (amount_in: u64, minimum_amount_out: u64)
      if (eventData.length < offset + 16) {
        throw new Error(`Insufficient data for swap parameters: need 16 bytes, have ${eventData.length - offset}`);
      }
      const amountIn = eventData.readBigUInt64LE(offset);
      offset += 8;
      const minimumAmountOut = eventData.readBigUInt64LE(offset);
      offset += 8;
      
      // SwapResult (actual_input_amount: u64, output_amount: u64, next_sqrt_price: u128, trading_fee: u64, protocol_fee: u64, referral_fee: u64)
      if (eventData.length < offset + 56) {
        throw new Error(`Insufficient data for swap result: need 56 bytes, have ${eventData.length - offset}`);
      }
      const actualInputAmount = eventData.readBigUInt64LE(offset);
      offset += 8;
      const outputAmount = eventData.readBigUInt64LE(offset);
      offset += 8;
      
      // Next sqrt price (u128 - 16 bytes)
      const nextSqrtPriceLow = eventData.readBigUInt64LE(offset);
      const nextSqrtPriceHigh = eventData.readBigUInt64LE(offset + 8);
      const nextSqrtPrice = nextSqrtPriceHigh * BigInt(2 ** 64) + nextSqrtPriceLow;
      offset += 16;
      
      const tradingFee = eventData.readBigUInt64LE(offset);
      offset += 8;
      const protocolFee = eventData.readBigUInt64LE(offset);
      offset += 8;
      const referralFee = eventData.readBigUInt64LE(offset);
      offset += 8;
      
      return {
        pool: bs58.encode(pool),
        config: bs58.encode(config),
        tradeDirection,
        hasReferral,
        amountIn: amountIn.toString(),
        minimumAmountOut: minimumAmountOut.toString(),
        actualInputAmount: actualInputAmount.toString(),
        outputAmount: outputAmount.toString(),
        nextSqrtPrice: nextSqrtPrice.toString(),
        tradingFee: tradingFee.toString(),
        protocolFee: protocolFee.toString(),
        referralFee: referralFee.toString(),
        transactionSignature: transaction.transaction?.signatures?.[0] || transaction.signature || 'Unknown'
      };
      
    } catch (error) {
      this.logger.error(`❌ Error decoding EvtSwap event data: ${error.message}`);
      return null;
    }
  }

  private scanTransactionForEvents(transaction: any): EvtSwapEvent[] {
    const events: EvtSwapEvent[] = [];
    
    // Scan inner instructions
    if (transaction.meta?.innerInstructions) {
      transaction.meta.innerInstructions.forEach((innerGroup: any, groupIndex: number) => {
        innerGroup.instructions.forEach((instruction: any, instructionIndex: number) => {
          if (!instruction.data) return;
          
          const rawData = Buffer.from(bs58.decode(instruction.data));
          const discriminatorResult = this.findEventDiscriminator(rawData);
          
          if (discriminatorResult) {
            const eventDataStart = discriminatorResult.offset + 8;
            const eventData = rawData.subarray(eventDataStart);
            const decodedEvent = this.decodeEvtSwapEventData(eventData, transaction);
            if (decodedEvent) {
              events.push(decodedEvent);
            }
          }
        });
      });
    }
    
    // Scan main instructions
    if (transaction.transaction?.message?.instructions) {
      transaction.transaction.message.instructions.forEach((instruction: any, index: number) => {
        if (!instruction.data) return;
        
        const rawData = Buffer.from(bs58.decode(instruction.data));
        const discriminatorResult = this.findEventDiscriminator(rawData);
        
        if (discriminatorResult) {
          const eventDataStart = discriminatorResult.offset + 8;
          const eventData = rawData.subarray(eventDataStart);
          const decodedEvent = this.decodeEvtSwapEventData(eventData, transaction);
          if (decodedEvent) {
            events.push(decodedEvent);
          }
        }
      });
    }
    
    return events;
  }

  private async saveEvtSwapEventToDatabase(event: EvtSwapEvent): Promise<void> {
    try {
      // Check if event already exists in database
      const existingEvent = await this.swapEventModel.findOne({
        transactionSignature: event.transactionSignature,
        pool: event.pool,
        config: event.config
      });

      if (existingEvent) {
        this.logger.log(`⚠️ Event already exists in database for transaction ${event.transactionSignature}`);
        return;
      }

      // Create new swap event document with only essential fields
      const swapEventData = {
        pool: event.pool,
        config: event.config,
        tradeDirection: event.tradeDirection,
        hasReferral: event.hasReferral,
        amountIn: event.amountIn,
        minimumAmountOut: event.minimumAmountOut,
        actualInputAmount: event.actualInputAmount,
        outputAmount: event.outputAmount,
        nextSqrtPrice: event.nextSqrtPrice,
        tradingFee: event.tradingFee,
        protocolFee: event.protocolFee,
        referralFee: event.referralFee,
        transactionSignature: event.transactionSignature
      };

      const swapEvent = new this.swapEventModel(swapEventData);
      await swapEvent.save();
      
      this.logger.log(`✅ Successfully saved EvtSwap event to database for transaction ${event.transactionSignature}`);
      this.logger.log(`📊 Event details: Pool=${event.pool}, TradeDirection=${event.tradeDirection}, AmountIn=${event.amountIn}`);
      
    } catch (error) {
      this.logger.error(`❌ Error saving EvtSwap event to database:`, error);
      throw error;
    }
  }
} 