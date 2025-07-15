"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anchor_1 = require("@project-serum/anchor");
const idl_1 = require("./src/constants/idl");
async function debugSwapEvents() {
    console.log('🧪 Debugging swap event parsing...');
    const coder = new anchor_1.BorshCoder(idl_1.DYNAMIC_BONDING_CURVE_IDL);
    console.log('🎯 Swap event discriminator:', idl_1.SWAP_EVENT_DISCRIMINATOR);
    console.log('🎯 Swap event discriminator (hex):', idl_1.SWAP_EVENT_DISCRIMINATOR.toString('hex'));
    const mockTransaction = {
        signature: 'test_signature_123',
        slot: 12345,
        blockTime: Date.now() / 1000,
        meta: {
            logMessages: [
                'Program 11111111111111111111111111111111 invoke [1]',
                'Program dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN invoke [2]',
                'Program dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN log: GzwV1aqKq7eT',
                'Program dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN success',
                'Program 11111111111111111111111111111111 success'
            ]
        }
    };
    const programId = 'dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN';
    console.log('\n📝 Processing transaction logs...');
    console.log('Transaction signature:', mockTransaction.signature);
    console.log('Total log messages:', mockTransaction.meta.logMessages.length);
    const programLogs = mockTransaction.meta.logMessages.filter(log => log.includes(`Program ${programId} log:`) ||
        log.includes(`Program ${programId} invoke`) ||
        log.includes(`Program ${programId} success`));
    console.log('🔍 Found program logs:', programLogs.length);
    for (const log of programLogs) {
        console.log(`\n🔍 Processing log: ${log}`);
        if (log.includes('log:')) {
            const logData = log.replace(`Program ${programId} log:`, '').trim();
            console.log('📊 Extracted log data:', logData);
            if (!logData) {
                console.log('❌ Empty log data');
                continue;
            }
            try {
                const decoded = Buffer.from(logData, 'base64');
                console.log('📊 Decoded base64 data length:', decoded.length);
                console.log('📊 Decoded data (hex):', decoded.toString('hex'));
                if (decoded.length >= 8) {
                    const first8Bytes = decoded.subarray(0, 8);
                    console.log('🔍 First 8 bytes (hex):', first8Bytes.toString('hex'));
                    console.log('🔍 Expected discriminator (hex):', idl_1.SWAP_EVENT_DISCRIMINATOR.toString('hex'));
                    console.log('🔍 Matches discriminator:', first8Bytes.equals(idl_1.SWAP_EVENT_DISCRIMINATOR));
                    if (first8Bytes.equals(idl_1.SWAP_EVENT_DISCRIMINATOR)) {
                        console.log('🎯 Found swap event discriminator!');
                        try {
                            const event = coder.events.decode(logData);
                            console.log('✅ Successfully decoded event:', JSON.stringify(event, null, 2));
                            if (event && event.name === 'EvtSwap') {
                                console.log('🟢 This is a swap event!');
                                const swapEventData = {
                                    signature: mockTransaction.signature,
                                    slot: mockTransaction.slot,
                                    blockTime: mockTransaction.blockTime,
                                    programId: programId,
                                    pool: event.data.pool?.toString(),
                                    config: event.data.config?.toString(),
                                    tradeDirection: event.data.trade_direction || event.data.tradeDirection,
                                    hasReferral: event.data.has_referral || event.data.hasReferral,
                                    amountIn: event.data.amount_in?.toString() || event.data.amountIn?.toString(),
                                    minimumAmountOut: event.data.params?.minimum_amount_out?.toString() || event.data.params?.minimumAmountOut?.toString(),
                                    actualInputAmount: event.data.swap_result?.actual_input_amount?.toString() || event.data.swapResult?.actualInputAmount?.toString(),
                                    outputAmount: event.data.swap_result?.output_amount?.toString() || event.data.swapResult?.outputAmount?.toString(),
                                    nextSqrtPrice: event.data.swap_result?.next_sqrt_price?.toString() || event.data.swapResult?.nextSqrtPrice?.toString(),
                                    tradingFee: event.data.swap_result?.trading_fee?.toString() || event.data.swapResult?.tradingFee?.toString(),
                                    protocolFee: event.data.swap_result?.protocol_fee?.toString() || event.data.swapResult?.protocolFee?.toString(),
                                    referralFee: event.data.swap_result?.referral_fee?.toString() || event.data.swapResult?.referralFee?.toString(),
                                    rawEvent: event.data
                                };
                                console.log('📊 Mapped swap event data:', JSON.stringify(swapEventData, null, 2));
                            }
                        }
                        catch (decodeError) {
                            console.log('❌ Error decoding event:', decodeError.message);
                            console.log('❌ Error details:', decodeError);
                        }
                    }
                    else {
                        console.log('❌ Log data doesn\'t match swap event discriminator');
                    }
                }
                else {
                    console.log('❌ Decoded data too short (less than 8 bytes)');
                }
            }
            catch (base64Error) {
                console.log('❌ Not valid base64 data:', base64Error.message);
            }
        }
    }
    console.log('\n🧪 Testing with a real base64 event...');
    const realEventBase64 = 'GzwV1aqKq7eT';
    try {
        const decoded = Buffer.from(realEventBase64, 'base64');
        console.log('📊 Real event decoded length:', decoded.length);
        console.log('📊 Real event decoded (hex):', decoded.toString('hex'));
        if (decoded.length >= 8) {
            const first8Bytes = decoded.subarray(0, 8);
            console.log('🔍 Real event first 8 bytes (hex):', first8Bytes.toString('hex'));
            console.log('🔍 Matches discriminator:', first8Bytes.equals(idl_1.SWAP_EVENT_DISCRIMINATOR));
            if (first8Bytes.equals(idl_1.SWAP_EVENT_DISCRIMINATOR)) {
                const event = coder.events.decode(realEventBase64);
                console.log('✅ Real event decoded:', event);
            }
        }
    }
    catch (error) {
        console.log('❌ Error with real event:', error.message);
    }
    console.log('\n📋 Available events in IDL:');
    const events = Object.keys(coder.events);
    events.forEach(eventName => {
        console.log(`  - ${eventName}`);
    });
    console.log('\n🔍 Testing event structure...');
    try {
        const swapEventCoder = coder.events['EvtSwap'];
        if (swapEventCoder) {
            console.log('✅ EvtSwap event coder found');
            console.log('📊 Event structure:', swapEventCoder);
        }
        else {
            console.log('❌ EvtSwap event coder not found');
        }
    }
    catch (error) {
        console.log('❌ Error accessing event structure:', error.message);
    }
}
debugSwapEvents().catch(console.error);
//# sourceMappingURL=debug-swap-events.js.map