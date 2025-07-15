// Solana Program IDs for Meteora Dynamic Bonding Curve ecosystem

export const PROGRAM_IDS = {
  // Dynamic Bonding Curve Program
  DYNAMIC_BONDING_CURVE: 'dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN',
  
  // DAMM (Dynamic AMM) Programs
 // DAMM_V1: 'Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB',
 // DAMM_V2: 'cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG',
  
  // Vault Program
  //VAULT: '24Uqj9JCLxUeoC3hGfh5W3s9FM9uCHDS2SG3LYwBpyTi',
} as const;

// Helper function to get all program IDs as an array
export const getAllProgramIds = (): string[] => {
  return Object.values(PROGRAM_IDS);
};

// Helper function to check if an account is one of our target programs
export const isTargetProgram = (accountKey: string): boolean => {
  return Object.values(PROGRAM_IDS).includes(accountKey as any);
}; 