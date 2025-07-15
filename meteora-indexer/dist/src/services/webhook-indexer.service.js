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
var WebhookIndexerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookIndexerService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const program_ids_1 = require("../constants/program-ids");
const evt_swap_decoder_service_1 = require("./evt-swap-decoder.service");
let WebhookIndexerService = WebhookIndexerService_1 = class WebhookIndexerService {
    httpService;
    evtSwapDecoderService;
    logger = new common_1.Logger(WebhookIndexerService_1.name);
    constructor(httpService, evtSwapDecoderService) {
        this.httpService = httpService;
        this.evtSwapDecoderService = evtSwapDecoderService;
    }
    async onModuleInit() {
        this.logger.log('🔄 Webhook Indexer Service Initialized');
        await this.startEvtSwapIndexing();
    }
    async startEvtSwapIndexing() {
        this.logger.log('🔄 Starting EvtSwap event indexing...');
        setInterval(async () => {
            try {
                await this.pollRecentTransactions();
            }
            catch (error) {
                this.logger.error('❌ Polling error:', error);
            }
        }, 10000);
    }
    async pollRecentTransactions() {
        const programs = (0, program_ids_1.getAllProgramIds)();
        for (const programId of programs) {
            try {
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://api.helius.xyz/v0/addresses/${programId}/transactions?api-key=${process.env.HELIUS_API_KEY}`, {
                    headers: { 'Content-Type': 'application/json' },
                    params: {
                        limit: 10,
                        includeRawTransaction: true,
                        includeMetadata: true,
                        commitment: 'confirmed',
                    },
                }));
                if (response.data && response.data.length > 0) {
                    this.logger.log(`📡 Found ${response.data.length} transactions for ${programId}`);
                    for (const tx of response.data) {
                        await this.processTransaction(tx, programId);
                    }
                }
                else {
                    this.logger.log(`📡 No transactions found for ${programId}`);
                }
            }
            catch (error) {
                this.logger.error(`❌ Error polling ${programId}:`, error.message);
                if (error.response) {
                    this.logger.error(`❌ Helius API error response:`, error.response.data);
                }
            }
        }
    }
    async processTransaction(transaction, programId) {
        this.logger.log('📊 Processing transaction:', {
            signature: transaction.signature,
            program: programId,
            slot: transaction.slot,
        });
        try {
            await this.evtSwapDecoderService.processTransaction(transaction);
        }
        catch (error) {
            this.logger.error(`❌ Error processing transaction ${transaction.signature}:`, error);
        }
    }
};
exports.WebhookIndexerService = WebhookIndexerService;
exports.WebhookIndexerService = WebhookIndexerService = WebhookIndexerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        evt_swap_decoder_service_1.EvtSwapDecoderService])
], WebhookIndexerService);
//# sourceMappingURL=webhook-indexer.service.js.map