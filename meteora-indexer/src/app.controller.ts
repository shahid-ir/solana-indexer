// src/app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookIndexerService } from './services/webhook-indexer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly webhookIndexerService: WebhookIndexerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('trigger-polling')
  async triggerPolling() {
    // This will manually trigger the polling process
    await this.webhookIndexerService.pollRecentTransactions();
    return { message: 'Polling triggered' };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}