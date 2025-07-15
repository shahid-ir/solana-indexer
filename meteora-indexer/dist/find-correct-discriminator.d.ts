declare class DiscriminatorFinder {
    private connection;
    private discriminators;
    constructor();
    findDiscriminators(): Promise<void>;
    analyzeTransactionLogs(transaction: any): Promise<void>;
    displayResults(): void;
    run(): Promise<void>;
}
export default DiscriminatorFinder;
