"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAP_EVENT_DISCRIMINATOR = exports.DYNAMIC_BONDING_CURVE_IDL = void 0;
const dynamic_bonding_curve_json_1 = __importDefault(require("../idl/dynamic_bonding_curve.json"));
exports.DYNAMIC_BONDING_CURVE_IDL = dynamic_bonding_curve_json_1.default;
exports.SWAP_EVENT_DISCRIMINATOR = Buffer.from([27, 60, 21, 213, 138, 170, 187, 147]);
//# sourceMappingURL=idl.js.map