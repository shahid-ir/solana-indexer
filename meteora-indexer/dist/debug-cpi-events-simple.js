"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const PROGRAM_ID = 'dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN';
const EVT_SWAP_DISCRIMINATOR = Buffer.from([27, 60, 21, 213, 138, 170, 187, 147]);
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
class CPIEventsDebugger {
    async testEnhancedAPI() {
        console.log('🧪 Testing Enhanced API (Current Implementation)');
        console.log('='.repeat(60));
        try {
            const response = await axios_1.default.get(`https://api.helius.xyz/v0/addresses/${PROGRAM_ID}/transactions?api-key=${HELIUS_API_KEY}`, {
                headers: { 'Content-Type': 'application/json' },
                params: { limit: 5 },
            });
            console.log(`📡 Found ${response.data.length} transactions`);
            for (const tx of response.data) {
                console.log(`\n📊 Transaction: ${tx.signature}`);
                console.log(`   Type: ${tx.type}`);
                console.log(`   Description: ${tx.description}`);
                console.log(`   Has meta field: ${!!tx.meta}`);
                console.log(`   Has logMessages: ${!!tx.meta?.logMessages}`);
                console.log(`   Log message count: ${tx.meta?.logMessages?.length || 0}`);
                if (tx.meta?.logMessages) {
                    console.log('   Log messages:');
                    tx.meta.logMessages.forEach((msg, index) => {
                        console.log(`     [${index}] ${msg}`);
                    });
                }
            }
        }
        catch (error) {
            console.error('❌ Enhanced API Error:', error.message);
        }
    }
    async testRawAPI() {
        console.log('\n🧪 Testing Raw API (What we need)');
        console.log('='.repeat(60));
        try {
            const signaturesResponse = await axios_1.default.get(`https://api.helius.xyz/v0/addresses/${PROGRAM_ID}/transactions?api-key=${HELIUS_API_KEY}`, {
                headers: { 'Content-Type': 'application/json' },
                params: { limit: 5 },
            });
            if (signaturesResponse.data && signaturesResponse.data.length > 0) {
                const signatures = signaturesResponse.data.map((tx) => tx.signature);
                console.log(`📡 Found ${signatures.length} transaction signatures`);
                const rawTransactionsResponse = await axios_1.default.post(`https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_API_KEY}`, {
                    transactions: signatures,
                    encoding: 'base64',
                    commitment: 'confirmed'
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(`📡 Retrieved ${rawTransactionsResponse.data.length} raw transactions`);
                for (const tx of rawTransactionsResponse.data) {
                    console.log(`\n📊 Raw Transaction: ${tx.signature}`);
                    console.log(`   Has meta field: ${!!tx.meta}`);
                    console.log(`   Has logMessages: ${!!tx.meta?.logMessages}`);
                    console.log(`   Log message count: ${tx.meta?.logMessages?.length || 0}`);
                    if (tx.meta?.logMessages) {
                        console.log('   Log messages:');
                        tx.meta.logMessages.forEach((msg, index) => {
                            console.log(`     [${index}] ${msg}`);
                        });
                        await this.detectCPIEvents(tx);
                    }
                }
            }
        }
        catch (error) {
            console.error('❌ Raw API Error:', error.message);
            if (error.response) {
                console.error('❌ API Response:', error.response.data);
            }
        }
    }
    async detectCPIEvents(transaction) {
        console.log('\n🔍 Detecting CPI Events...');
        const cpiStack = [];
        let eventCount = 0;
        for (const log of transaction.meta.logMessages) {
            if (log.includes('invoke')) {
                const programId = this.extractProgramId(log);
                cpiStack.push(programId);
                console.log(`   📥 CPI Invoke: ${programId} (Stack depth: ${cpiStack.length})`);
            }
            else if (log.includes('success') || log.includes('failed')) {
                const programId = cpiStack.pop();
                console.log(`   📤 CPI ${log.includes('success') ? 'Success' : 'Failed'}: ${programId} (Stack depth: ${cpiStack.length})`);
            }
            let base64 = null;
            if (log.startsWith('Program log: ')) {
                base64 = log.slice('Program log: '.length);
                console.log(`   📝 Program log detected`);
            }
            else if (log.startsWith(`Program ${PROGRAM_ID} log:`)) {
                base64 = log.slice(`Program ${PROGRAM_ID} log:`.length).trim();
                console.log(`   📝 Target program log detected`);
            }
            else if (log.includes('log:') && log.includes(PROGRAM_ID)) {
                const logMatch = log.match(new RegExp(`Program ${PROGRAM_ID} log: (.+)`));
                if (logMatch) {
                    base64 = logMatch[1];
                    console.log(`   📝 CPI program log detected`);
                }
            }
            if (base64) {
                try {
                    const decoded = Buffer.from(base64, 'base64');
                    console.log(`   🔍 Base64 data length: ${decoded.length} bytes`);
                    console.log(`   🔍 First 16 bytes: ${decoded.subarray(0, 16).toString('hex')}`);
                    if (decoded.length >= 8) {
                        const first8Bytes = decoded.subarray(0, 8);
                        console.log(`   🎯 First 8 bytes: ${first8Bytes.toString('hex')}`);
                        console.log(`   🎯 Expected EvtSwap: ${EVT_SWAP_DISCRIMINATOR.toString('hex')}`);
                        console.log(`   🎯 Matches EvtSwap: ${first8Bytes.equals(EVT_SWAP_DISCRIMINATOR)}`);
                        if (first8Bytes.equals(EVT_SWAP_DISCRIMINATOR)) {
                            console.log('   🎯 FOUND EVT_SWAP EVENT!');
                            eventCount++;
                            console.log('   ✅ Event discriminator matched!');
                        }
                    }
                }
                catch (base64Error) {
                    console.log('   ❌ Invalid base64 data:', base64Error.message);
                }
            }
        }
        console.log(`\n📊 CPI Event Detection Summary:`);
        console.log(`   Total events found: ${eventCount}`);
        console.log(`   CPI stack depth: ${cpiStack.length}`);
    }
    extractProgramId(log) {
        const match = log.match(/Program ([A-Za-z0-9]{32,44}) invoke/);
        return match ? match[1] : 'unknown';
    }
    async runAllTests() {
        console.log('🚀 Starting CPI Events Debug Test');
        console.log('='.repeat(60));
        console.log(`🎯 Program ID: ${PROGRAM_ID}`);
        console.log(`🔍 EvtSwap Discriminator: ${EVT_SWAP_DISCRIMINATOR.toString('hex')}`);
        console.log(`🔑 API Key: ${HELIUS_API_KEY ? '✅ Set' : '❌ Missing'}`);
        if (!HELIUS_API_KEY) {
            console.error('❌ HELIUS_API_KEY environment variable is required');
            console.log('💡 Set it with: export HELIUS_API_KEY=your_api_key');
            return;
        }
        await this.testEnhancedAPI();
        await this.testRawAPI();
        console.log('\n✅ Debug test completed!');
    }
}
async function main() {
    const cpiDebugger = new CPIEventsDebugger();
    await cpiDebugger.runAllTests();
}
if (require.main === module) {
    main().catch(console.error);
}
exports.default = CPIEventsDebugger;
//# sourceMappingURL=debug-cpi-events-simple.js.map