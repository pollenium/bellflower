import ethers from 'ethers';
import { Snowdrop } from 'pollenium-snowdrop';
import { Bytes32, Uint256 } from 'pollenium-buttercup';
export interface Block {
    number: Uint256;
    hash: Bytes32;
    timestamp: Uint256;
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
