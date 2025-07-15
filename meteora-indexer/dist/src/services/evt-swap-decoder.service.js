"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EvtSwapDecoderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvtSwapDecoderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const swap_event_model_1 = require("../swap-event.model");
let EvtSwapDecoderService = EvtSwapDecoderService_1 = class EvtSwapDecoderService {
    swapEventModel;
    logger = new common_1.Logger(EvtSwapDecoderService_1.name);
    connection;
    SWAP_EVENT_DISCRIMINATOR = Buffer.from([27, 60, 21, 213, 138, 170, 187, 147]);
    constructor(swapEventModel) {
        this.swapEventModel = swapEventModel;
        this.connection = new web3_js_1.Connection('https://mainnet.helius-rpc.com/?api-key=29c1bedf-6af2-4f78-bdf5-bf4765e0a741');
    }
    async processTransaction(transaction) {
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
        for (const event of events) {
            await this.saveEvtSwapEventToDatabase(event);
        }
        this.logger.log(`✅ Successfully processed ${events.length} EvtSwap events for transaction ${transaction.signature || 'Unknown'}`);
        return events;
    }
    findEventDiscriminator(data) {
        for (let offset = 0; offset <= data.length - 8; offset++) {
            const potentialDiscriminator = data.subarray(offset, offset + 8);
            if (potentialDiscriminator.equals(this.SWAP_EVENT_DISCRIMINATOR)) {
                return { type: 'EvtSwap', offset };
            }
        }
        return null;
    }
    decodeEvtSwapEventData(eventData, transaction) {
        try {
            let offset = 0;
            if (eventData.length < offset + 32) {
                throw new Error(`Insufficient data for pool: need 32 bytes, have ${eventData.length - offset}`);
            }
            const pool = eventData.subarray(offset, offset + 32);
            offset += 32;
            if (eventData.length < offset + 32) {
                throw new Error(`Insufficient data for config: need 32 bytes, have ${eventData.length - offset}`);
            }
            const config = eventData.subarray(offset, offset + 32);
            offset += 32;
            if (eventData.length < offset + 1) {
                throw new Error(`Insufficient data for trade direction: need 1 byte, have ${eventData.length - offset}`);
            }
            const tradeDirection = eventData[offset];
            offset += 1;
            if (eventData.length < offset + 1) {
                throw new Error(`Insufficient data for has referral: need 1 byte, have ${eventData.length - offset}`);
            }
            const hasReferral = eventData[offset] === 1;
            offset += 1;
            if (eventData.length < offset + 16) {
                throw new Error(`Insufficient data for swap parameters: need 16 bytes, have ${eventData.length - offset}`);
            }
            const amountIn = eventData.readBigUInt64LE(offset);
            offset += 8;
            const minimumAmountOut = eventData.readBigUInt64LE(offset);
            offset += 8;
            if (eventData.length < offset + 56) {
                throw new Error(`Insufficient data for swap result: need 56 bytes, have ${eventData.length - offset}`);
            }
            const actualInputAmount = eventData.readBigUInt64LE(offset);
            offset += 8;
            const outputAmount = eventData.readBigUInt64LE(offset);
            offset += 8;
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
                pool: bs58_1.default.encode(pool),
                config: bs58_1.default.encode(config),
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
        }
        catch (error) {
            this.logger.error(`❌ Error decoding EvtSwap event data: ${error.message}`);
            return null;
        }
    }
    scanTransactionForEvents(transaction) {
        const events = [];
        if (transaction.meta?.innerInstructions) {
            transaction.meta.innerInstructions.forEach((innerGroup, groupIndex) => {
                innerGroup.instructions.forEach((instruction, instructionIndex) => {
                    if (!instruction.data)
                        return;
                    const rawData = Buffer.from(bs58_1.default.decode(instruction.data));
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
        if (transaction.transaction?.message?.instructions) {
            transaction.transaction.message.instructions.forEach((instruction, index) => {
                if (!instruction.data)
                    return;
                const rawData = Buffer.from(bs58_1.default.decode(instruction.data));
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
    async saveEvtSwapEventToDatabase(event) {
        try {
            const existingEvent = await this.swapEventModel.findOne({
                transactionSignature: event.transactionSignature,
                pool: event.pool,
                config: event.config
            });
            if (existingEvent) {
                this.logger.log(`⚠️ Event already exists in database for transaction ${event.transactionSignature}`);
                return;
            }
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
        }
        catch (error) {
            this.logger.error(`❌ Error saving EvtSwap event to database:`, error);
            throw error;
        }
    }
};
exports.EvtSwapDecoderService = EvtSwapDecoderService;
exports.EvtSwapDecoderService = EvtSwapDecoderService = EvtSwapDecoderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(swap_event_model_1.SwapEvent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EvtSwapDecoderService);
//# sourceMappingURL=evt-swap-decoder.service.js.map