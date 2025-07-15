import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getAllProgramIds } from '../constants/program-ids';
import { EvtSwapDecoderService } from './evt-swap-decoder.service';

@Injectable()
export class WebhookIndexerService implements OnModuleInit {
  private readonly logger = new Logger(WebhookIndexerService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly evtSwapDecoderService: EvtSwapDecoderService,
  ) {}

  async onModuleInit() {
    this.logger.log('🔄 Webhook Indexer Service Initialized');
    await this.startEvtSwapIndexing();
  }

  private async startEvtSwapIndexing() {
    this.logger.log('🔄 Starting EvtSwap event indexing...');
    setInterval(async () => {
      try {
        await this.pollRecentTransactions();
      } catch (error) {
        this.logger.error('❌ Polling error:', error);
      }
    }, 10000);
  }

  public async pollRecentTransactions() {
    const programs = getAllProgramIds();
    for (const programId of programs) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(
            `https://api.helius.xyz/v0/addresses/${programId}/transactions?api-key=${process.env.HELIUS_API_KEY}`,
            {
              headers: { 'Content-Type': 'application/json' },
              params: {
                limit: 10,
                includeRawTransaction: true,
                includeMetadata: true,
                commitment: 'confirmed',
              },
            }
          )
        );

        if (response.data && response.data.length > 0) {
          this.logger.log(`📡 Found ${response.data.length} transactions for ${programId}`);
          for (const tx of response.data) {
            await this.processTransaction(tx, programId);
          }
        } else {
          this.logger.log(`📡 No transactions found for ${programId}`);
        }
      } catch (error: any) {
        this.logger.error(`❌ Error polling ${programId}:`, error.message);
        if (error.response) {
          this.logger.error(`❌ Helius API error response:`, error.response.data);
        }
      }
    }
  }

  public async processTransaction(transaction: any, programId: string) {
    this.logger.log('📊 Processing transaction:', {
      signature: transaction.signature,
      program: programId,
      slot: transaction.slot,
    });

    try {
      // Check if this is a swap transaction by looking for our program in instructions

      // Use the unified decoder service
      await this.evtSwapDecoderService.processTransaction(transaction);
    } catch (error) {
      this.logger.error(`❌ Error processing transaction ${transaction.signature}:`, error);
    }
  }

}