"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTargetProgram = exports.getAllProgramIds = exports.PROGRAM_IDS = void 0;
exports.PROGRAM_IDS = {
    DYNAMIC_BONDING_CURVE: 'dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN',
};
const getAllProgramIds = () => {
    return Object.values(exports.PROGRAM_IDS);
};
exports.getAllProgramIds = getAllProgramIds;
const isTargetProgram = (accountKey) => {
    return Object.values(exports.PROGRAM_IDS).includes(accountKey);
};
exports.isTargetProgram = isTargetProgram;
//# sourceMappingURL=program-ids.js.map