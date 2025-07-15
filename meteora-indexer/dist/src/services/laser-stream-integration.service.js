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
var LaserStreamIntegrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaserStreamIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const evt_swap_decoder_service_1 = require("./evt-swap-decoder.service");
const web3_js_1 = require("@solana/web3.js");
let LaserStreamIntegrationService = LaserStreamIntegrationService_1 = class LaserStreamIntegrationService {
    httpService;
    evtSwapDecoderService;
    logger = new common_1.Logger(LaserStreamIntegrationService_1.name);
    constructor(httpService, evtSwapDecoderService) {
        this.httpService = httpService;
        this.evtSwapDecoderService = evtSwapDecoderService;
    }
    async onModuleInit() {
        this.logger.log('🧩 Laser Stream Integration Service Initialized');
        await this.startEvtSwapPolling();
    }
    async startEvtSwapPolling() {
        this.logger.log('🔄 Starting Laser Stream Transaction Polling...');
        setInterval(async () => {
            try {
                await this.pollLaserStreamForTransactions();
            }
            catch (error) {
                this.logger.error('❌ Error polling Laser Stream for transactions:', error);
            }
        }, 10000);
    }
    async pollLaserStreamForTransactions() {
        try {
            const transactions = await this.fetchRecentTransactionsFromLaserStream();
            if (transactions.length === 0) {
                this.logger.log('📡 No new transactions found from Laser Stream');
                return;
            }
            this.logger.log(`📡 Found ${transactions.length} transactions from Laser Stream`);
            for (const txHash of transactions) {
                await this.processTransactionHash(txHash);
            }
        }
        catch (error) {
            this.logger.error('❌ Error in pollLaserStreamForTransactions:', error);
        }
    }
    async fetchRecentTransactionsFromLaserStream() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.helius.xyz/v0/addresses/dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN/transactions', {
                headers: { 'Content-Type': 'application/json' },
                params: {
                    'api-key': process.env.HELIUS_API_KEY,
                    limit: 10,
                    includeRawTransaction: true,
                    includeMetadata: true,
                    commitment: 'confirmed',
                },
            }));
            if (response.data && response.data.length > 0) {
                return response.data.map((tx) => tx.signature);
            }
            return [];
        }
        catch (error) {
            this.logger.error('❌ Error fetching transactions from Laser Stream:', error);
            return [];
        }
    }
    async processTransactionHash(txHash) {
        this.logger.log(`📊 Processing transaction: ${txHash}`);
        try {
            const transaction = await this.getTransactionDetails(txHash);
            if (!transaction) {
                this.logger.warn(`❌ Could not fetch transaction details for: ${txHash}`);
                return;
            }
            await this.evtSwapDecoderService.processTransaction(transaction);
        }
        catch (error) {
            this.logger.error(`❌ Error processing transaction ${txHash}:`, error);
        }
    }
    async processTransactionFromLaserStream(transactionData) {
        const { signature, slot, timestamp, transaction, meta } = transactionData;
        this.logger.log(`📊 Processing LaserStream transaction: ${signature}`);
        try {
            const formattedTransaction = {
                signature,
                slot,
                blockTime: timestamp,
                transaction,
                meta
            };
            await this.evtSwapDecoderService.processTransaction(formattedTransaction);
        }
        catch (error) {
            this.logger.error(`❌ Error processing LaserStream transaction ${signature}:`, error);
        }
    }
    async getTransactionDetails(txHash) {
        try {
            const connection = new web3_js_1.Connection('https://mainnet.helius-rpc.com/?api-key=29c1bedf-6af2-4f78-bdf5-bf4765e0a741');
            const transaction = await connection.getTransaction(txHash, {
                maxSupportedTransactionVersion: 0
            });
            return transaction;
        }
        catch (error) {
            this.logger.error(`❌ Error fetching transaction ${txHash}:`, error);
            return null;
        }
    }
};
exports.LaserStreamIntegrationService = LaserStreamIntegrationService;
exports.LaserStreamIntegrationService = LaserStreamIntegrationService = LaserStreamIntegrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        evt_swap_decoder_service_1.EvtSwapDecoderService])
], LaserStreamIntegrationService);
//# sourceMappingURL=laser-stream-integration.service.js.map