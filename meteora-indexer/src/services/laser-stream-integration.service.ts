import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EvtSwapDecoderService } from './evt-swap-decoder.service';
import { Connection } from '@solana/web3.js';

@Injectable()
export class LaserStreamIntegrationService implements OnModuleInit {
  private readonly logger = new Logger(LaserStreamIntegrationService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly evtSwapDecoderService: EvtSwapDecoderService,
  ) {}

  async onModuleInit() {
    this.logger.log('🧩 Laser Stream Integration Service Initialized');
    await this.startEvtSwapPolling();
  }

  private async startEvtSwapPolling() {
    this.logger.log('🔄 Starting Laser Stream Transaction Polling...');
    setInterval(async () => {
      try {
        await this.pollLaserStreamForTransactions();
      } catch (error) {
        this.logger.error('❌ Error polling Laser Stream for transactions:', error);
      }
    }, 10000); // Poll every 10 seconds
  }

  private async pollLaserStreamForTransactions() {
    try {
      // Step 1: Fetch transaction hashes from Laser Stream API
      const transactions = await this.fetchRecentTransactionsFromLaserStream();
      
      if (transactions.length === 0) {
        this.logger.log('📡 No new transactions found from Laser Stream');
        return;
      }

      this.logger.log(`📡 Found ${transactions.length} transactions from Laser Stream`);

      // Step 2: Process each transaction hash and decode EvtSwap events
      for (const txHash of transactions) {
        await this.processTransactionHash(txHash);
      }
    } catch (error) {
      this.logger.error('❌ Error in pollLaserStreamForTransactions:', error);
    }
  }

  private async fetchRecentTransactionsFromLaserStream(): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.helius.xyz/v0/addresses/dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN/transactions', {
          headers: { 'Content-Type': 'application/json' },
          params: {
            'api-key': process.env.HELIUS_API_KEY,
            limit: 10,
            includeRawTransaction: true,
            includeMetadata: true,
            commitment: 'confirmed',
          },
        })
      );

      if (response.data && response.data.length > 0) {
        return response.data.map((tx: any) => tx.signature);
      }

      return [];
    } catch (error) {
      this.logger.error('❌ Error fetching transactions from Laser Stream:', error);
      return [];
    }
  }

  private async processTransactionHash(txHash: string) {
    this.logger.log(`📊 Processing transaction: ${txHash}`);

    try {
      // Get the transaction details using the transaction hash
      const transaction = await this.getTransactionDetails(txHash);
      
      if (!transaction) {
        this.logger.warn(`❌ Could not fetch transaction details for: ${txHash}`);
        return;
      }

      // Use the unified decoder service
      await this.evtSwapDecoderService.processTransaction(transaction);
    } catch (error) {
      this.logger.error(`❌ Error processing transaction ${txHash}:`, error);
    }
  }

  public async processTransactionFromLaserStream(transactionData: any) {
    const { signature, slot, timestamp, transaction, meta } = transactionData;
    
    this.logger.log(`📊 Processing LaserStream transaction: ${signature}`);

    try {
      // Create a transaction object that matches the expected format
      const formattedTransaction = {
        signature,
        slot,
        blockTime: timestamp,
        transaction,
        meta
      };

      // Use the unified decoder service
      await this.evtSwapDecoderService.processTransaction(formattedTransaction);
    } catch (error) {
      this.logger.error(`❌ Error processing LaserStream transaction ${signature}:`, error);
    }
  }

  private async getTransactionDetails(txHash: string): Promise<any> {
    try {
      const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=29c1bedf-6af2-4f78-bdf5-bf4765e0a741');
      const transaction = await connection.getTransaction(txHash, {
        maxSupportedTransactionVersion: 0
      });
      return transaction;
    } catch (error) {
      this.logger.error(`❌ Error fetching transaction ${txHash}:`, error);
      return null;
    }
  }
} 