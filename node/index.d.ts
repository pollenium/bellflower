import ethers from 'ethers';
import { Snowdrop } from 'pollenium-snowdrop';
import { Uint256 } from 'pollenium-buttercup';
export declare class Bellflower {
    readonly provider: ethers.providers.Provider;
    private latestBlockIndex;
    private latestBlockIndexPrimrose;
    readonly blockIndexSnowdrop: Snowdrop<Uint256>;
    constructor(provider: ethers.providers.Provider);
    private linkProviderOnBlock;
    fetchLatestBlockIndex(): Promise<Uint256>;
    private setLatestBlockIndex;
}
