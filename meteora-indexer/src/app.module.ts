// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { databaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookIndexerService } from './services/webhook-indexer.service';
import { LaserStreamIntegrationService } from './services/laser-stream-integration.service';
import { EvtSwapDecoderService } from './services/evt-swap-decoder.service';
import { SwapEvent, SwapEventSchema } from './swap-event.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!, databaseConfig),
    MongooseModule.forFeature([{ name: SwapEvent.name, schema: SwapEventSchema }]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WebhookIndexerService,
    LaserStreamIntegrationService,
    EvtSwapDecoderService,
  ],
})
export class AppModule {}