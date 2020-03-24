import ethers from 'ethers'
import { Snowdrop } from 'pollenium-snowdrop'
import { Bytes32, Uint256 } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'
import { Uu } from 'pollenium-uvaursi'

export interface Block {
  number: Uint256,
  hash: Bytes32,
  timestamp: Uint256
}

export class Bellflower {

  private latestBlock: Block
  private latestBlockPrimrose: Primrose<Block>
  readonly blockSnowdrop: Snowdrop<Block> = new Snowdrop<Block>()


  constructor(readonly provider: ethers.providers.Provider) {
    this.linkProviderOnBlock()
  }


  private linkProviderOnBlock() {
    this.provider.on('block', async (blockNumber: number) => {
      const ethersBlock = await this.provider.getBlock(blockNumber)
      this.latestBlock = {
        number: Uint256.fromNumber(ethersBlock.number),
        hash: new Bytes32(Uu.fromHexish(ethersBlock.hash)),
        timestamp: Uint256.fromNumber(ethersBlock.timestamp)
      }

      if (this.latestBlockPrimrose) {
        this.latestBlockPrimrose.resolve(this.latestBlock)
        delete this.latestBlockPrimrose
      }

      this.blockSnowdrop.emit(this.latestBlock)
    })
  }

  async fetchLatestBlock(): Promise<Block> {
    if (this.latestBlock) {
      return this.latestBlock
    }
    if (this.latestBlockPrimrose) {
      return this.latestBlockPrimrose.promise
    }
    this.latestBlockPrimrose = new Primrose<Block>()

    const ethersBlock = await this.provider.getBlock('latest')
    this.latestBlock = {
      number: Uint256.fromNumber(ethersBlock.number),
      hash: new Bytes32(Uu.fromHexish(ethersBlock.hash)),
      timestamp: Uint256.fromNumber(ethersBlock.timestamp)
    }

    return this.latestBlockPrimrose.promise
  }

}
