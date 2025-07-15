"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
class EvtSwapDecoder {
    connection;
    SWAP_EVENT_DISCRIMINATOR = Buffer.from([27, 60, 21, 213, 138, 170, 187, 147]);
    constructor() {
        this.connection = new web3_js_1.Connection('https://mainnet.helius-rpc.com/?api-key=29c1bedf-6af2-4f78-bdf5-bf4765e0a741');
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
    decodeEvtSwapEventData(eventData, transaction, instructionIndex) {
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
            const nextSqrtPrice = nextSqrtPriceHigh * (2n ** 64n) + nextSqrtPriceLow;
            offset += 16;
            const tradingFee = eventData.readBigUInt64LE(offset);
            offset += 8;
            const protocolFee = eventData.readBigUInt64LE(offset);
            offset += 8;
            const referralFee = eventData.readBigUInt64LE(offset);
            offset += 8;
            const amountInOffset = eventData.length - 16;
            const timestampOffset = eventData.length - 8;
            if (amountInOffset < offset) {
                throw new Error(`Invalid offset for amount_in: ${amountInOffset} < ${offset}`);
            }
            const finalAmountIn = eventData.readBigUInt64LE(amountInOffset);
            const timestamp = eventData.readBigUInt64LE(timestampOffset);
            return {
                pool: bs58_1.default.encode(pool),
                config: bs58_1.default.encode(config),
                tradeDirection,
                hasReferral,
                amountIn: Number(amountIn),
                minimumAmountOut: Number(minimumAmountOut),
                actualInputAmount: Number(actualInputAmount),
                outputAmount: Number(outputAmount),
                nextSqrtPrice,
                tradingFee: Number(tradingFee),
                protocolFee: Number(protocolFee),
                referralFee: Number(referralFee),
                timestamp: Number(timestamp),
                timestampISO: new Date(Number(timestamp) * 1000).toISOString(),
                transactionSignature: transaction.transaction?.signatures?.[0] || 'Unknown'
            };
        }
        catch (error) {
            console.log(`❌ Error decoding EvtSwap event data: ${error.message}`);
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
                        const decodedEvent = this.decodeEvtSwapEventData(eventData, transaction, instructionIndex);
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
                    const decodedEvent = this.decodeEvtSwapEventData(eventData, transaction, index);
                    if (decodedEvent) {
                        events.push(decodedEvent);
                    }
                }
            });
        }
        return events;
    }
    displayEvent(event) {
        console.log('\n📊 Decoded EvtSwap Event:');
        console.log('='.repeat(50));
        console.log(`🏊 Pool: ${event.pool}`);
        console.log(`⚙️ Config: ${event.config}`);
        console.log(`🔄 Trade Direction: ${event.tradeDirection} (${event.tradeDirection === 0 ? 'BUY' : 'SELL'})`);
        console.log(`🎯 Has Referral: ${event.hasReferral}`);
        console.log(`💰 Amount In: ${event.amountIn.toLocaleString()}`);
        console.log(`💰 Minimum Amount Out: ${event.minimumAmountOut.toLocaleString()}`);
        console.log(`💸 Actual Input Amount: ${event.actualInputAmount.toLocaleString()}`);
        console.log(`💎 Output Amount: ${event.outputAmount.toLocaleString()}`);
        console.log(`📈 Next Sqrt Price: ${event.nextSqrtPrice.toString()}`);
        console.log(`💸 Trading Fee: ${event.tradingFee.toLocaleString()}`);
        console.log(`🏛️ Protocol Fee: ${event.protocolFee.toLocaleString()}`);
        console.log(`🎯 Referral Fee: ${event.referralFee.toLocaleString()}`);
        console.log(`⏰ Timestamp: ${event.timestamp.toLocaleString()} (${event.timestampISO})`);
        console.log(`🔗 Transaction Signature: ${event.transactionSignature}`);
    }
    async decodeTransaction(transactionHash) {
        try {
            console.log(`🔍 Decoding transaction: ${transactionHash}`);
            const transaction = await this.connection.getTransaction(transactionHash, {
                maxSupportedTransactionVersion: 0
            });
            if (!transaction) {
                console.error('❌ Transaction not found');
                return;
            }
            const events = this.scanTransactionForEvents(transaction);
            if (events.length === 0) {
                console.log('❌ No EvtSwap events found in transaction');
                return;
            }
            events.forEach((event, index) => {
                console.log(`\n🎯 Event #${index + 1}:`);
                this.displayEvent(event);
            });
        }
        catch (error) {
            console.error(`❌ Error decoding transaction: ${error.message}`);
        }
    }
}
async function main() {
    const transactionHash = process.argv[2];
    if (!transactionHash) {
        console.error('❌ Please provide a transaction hash as an argument');
        console.error('Usage: npx ts-node src/scripts/debug-tx.ts <transaction-hash>');
        process.exit(1);
    }
    const decoder = new EvtSwapDecoder();
    await decoder.decodeTransaction(transactionHash);
}
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=debug-tx.js.map