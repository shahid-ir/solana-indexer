"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const database_config_1 = require("./config/database.config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const webhook_indexer_service_1 = require("./services/webhook-indexer.service");
const laser_stream_integration_service_1 = require("./services/laser-stream-integration.service");
const evt_swap_decoder_service_1 = require("./services/evt-swap-decoder.service");
const swap_event_model_1 = require("./swap-event.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI, database_config_1.databaseConfig),
            mongoose_1.MongooseModule.forFeature([{ name: swap_event_model_1.SwapEvent.name, schema: swap_event_model_1.SwapEventSchema }]),
            axios_1.HttpModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            webhook_indexer_service_1.WebhookIndexerService,
            laser_stream_integration_service_1.LaserStreamIntegrationService,
            evt_swap_decoder_service_1.EvtSwapDecoderService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map