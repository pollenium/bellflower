import ethers from 'ethers';
import { Snowdrop } from 'pollenium-snowdrop';
import { Bytes32 } from 'pollenium-buttercup';
export interface Block {
    number: number;
    hash: Bytes32;
    timestamp: number;
}
export declare class Bellflower {
    readonly provider: ethers.providers.Provider;
    private latestBlock;
    private latestBlockPrimrose;
    readonly blockSnowdrop: Snowdrop<Block>;
    constructor(provider: ethers.providers.Provider);
    private linkProviderOnBlock;
    fetchLatestBlock(): Promise<Block>;
}
