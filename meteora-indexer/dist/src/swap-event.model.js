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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapEventSchema = exports.SwapEvent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SwapEvent = class SwapEvent extends mongoose_2.Document {
    pool;
    config;
    tradeDirection;
    hasReferral;
    amountIn;
    minimumAmountOut;
    actualInputAmount;
    outputAmount;
    nextSqrtPrice;
    tradingFee;
    protocolFee;
    referralFee;
    transactionSignature;
};
exports.SwapEvent = SwapEvent;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "pool", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "config", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SwapEvent.prototype, "tradeDirection", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], SwapEvent.prototype, "hasReferral", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "amountIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "minimumAmountOut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "actualInputAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "outputAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "nextSqrtPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "tradingFee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "protocolFee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "referralFee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], SwapEvent.prototype, "transactionSignature", void 0);
exports.SwapEvent = SwapEvent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SwapEvent);
exports.SwapEventSchema = mongoose_1.SchemaFactory.createForClass(SwapEvent);
exports.SwapEventSchema.index({ pool: 1, transactionSignature: 1 });
exports.SwapEventSchema.index({ transactionSignature: 1 }, { unique: true });
//# sourceMappingURL=swap-event.model.js.map