declare class CPIEventsDebugger {
    testEnhancedAPI(): Promise<void>;
    testRawAPI(): Promise<void>;
    detectCPIEvents(transaction: any): Promise<void>;
    extractProgramId(log: string): string;
    runAllTests(): Promise<void>;
}
export default CPIEventsDebugger;
