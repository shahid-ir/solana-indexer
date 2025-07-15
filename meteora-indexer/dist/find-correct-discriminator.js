"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const PROGRAM_ID = 'dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN';
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
class DiscriminatorFinder {
    connection;
    discriminators = new Map();
    constructor() {
        this.connection = new web3_js_1.Connection(HELIUS_RPC_URL, 'confirmed');
    }
    async findDiscriminators() {
        console.log('🔍 Finding Correct Event Discriminators');
        console.log('='.repeat(60));
        try {
            const signatures = await this.connection.getSignaturesForAddress(new web3_js_1.PublicKey(PROGRAM_ID), { limit: 20 });
            console.log(`📡 Found ${signatures.length} transaction signatures`);
            for (const sigInfo of signatures) {
                console.log(`\n📊 Processing signature: ${sigInfo.signature}`);
                try {
                    const transaction = await this.connection.getTransaction(sigInfo.signature, {
                        commitment: 'confirmed',
                        maxSupportedTransactionVersion: 0
                    });
                    if (transaction?.meta?.logMessages) {
                        await this.analyzeTransactionLogs(transaction);
                    }
                }
                catch (error) {
                    console.log(`   ❌ Error fetching transaction: ${error.message}`);
                }
            }
            this.displayResults();
        }
        catch (error) {
            console.error('❌ Error:', error.message);
        }
    }
    async analyzeTransactionLogs(transaction) {
        for (const log of transaction.meta.logMessages) {
            if (log.includes(`Program ${PROGRAM_ID} log:`)) {
                const base64 = log.slice(`Program ${PROGRAM_ID} log:`.length).trim();
                try {
                    const decoded = Buffer.from(base64, 'base64');
                    if (decoded.length >= 8) {
                        const first8Bytes = decoded.subarray(0, 8);
                        const discriminator = first8Bytes.toString('hex');
                        const count = this.discriminators.get(discriminator) || 0;
                        this.discriminators.set(discriminator, count + 1);
                        console.log(`   🎯 Found discriminator: ${discriminator} (${decoded.length} bytes)`);
                        console.log(`   📝 Full data: ${base64}`);
                    }
                }
                catch (error) {
                }
            }
        }
    }
    displayResults() {
        console.log('\n📊 Discriminator Analysis Results');
        console.log('='.repeat(60));
        if (this.discriminators.size === 0) {
            console.log('❌ No discriminators found');
            return;
        }
        const sorted = Array.from(this.discriminators.entries())
            .sort((a, b) => b[1] - a[1]);
        console.log(`📈 Found ${sorted.length} unique discriminators:`);
        for (const [discriminator, count] of sorted) {
            console.log(`   ${discriminator}: ${count} occurrences`);
        }
        console.log('\n🏆 Most Common Discriminators:');
        sorted.slice(0, 5).forEach(([discriminator, count], index) => {
            console.log(`   ${index + 1}. ${discriminator} (${count} times)`);
        });
    }
    async run() {
        console.log('🚀 Starting Discriminator Finder');
        console.log('='.repeat(60));
        console.log(`🎯 Program ID: ${PROGRAM_ID}`);
        console.log(`🔑 API Key: ${HELIUS_API_KEY ? '✅ Set' : '❌ Missing'}`);
        if (!HELIUS_API_KEY) {
            console.error('❌ HELIUS_API_KEY environment variable is required');
            return;
        }
        await this.findDiscriminators();
        console.log('\n✅ Discriminator finder completed!');
    }
}
async function main() {
    const finder = new DiscriminatorFinder();
    await finder.run();
}
if (require.main === module) {
    main().catch(console.error);
}
exports.default = DiscriminatorFinder;
//# sourceMappingURL=find-correct-discriminator.js.map