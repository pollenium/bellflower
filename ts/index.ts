import ethers from 'ethers'
import { Snowdrop } from 'pollenium-snowdrop'
import { Bytes32 } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'

export interface Block {
  number: number,
  hash: Bytes32,
  timestamp: number
}

export class Bellflower {

  private latestBlock: Block
  private latestBlockPromise: Primrose<Block>
  readonly blockSnowdrop: Snowdrop<Block> = new Snowdrop<Block>()


  constructor(readonly provider: ethers.providers.Provider) {
    this.linkProviderOnBlock()
  }


  private linkProviderOnBlock() {
    this.provider.on('block', async (blockNumber: number) => {
      const ethersBlock = await this.provider.getBlock(blockNumber)
      this.latestBlock = {
        number: ethersBlock.number,
        hash: Bytes32.fromHexish(ethersBlock.hash),
        timestamp: ethersBlock.timestamp
      }

      if (this.latestBlockPromise) {
        this.latestBlockPromise.resolve(this.latestBlock)
        delete this.latestBlockPromise
      }

      this.blockSnowdrop.emit(this.latestBlock)
    })
  }

  private async fetchLatestBlock(): Promise<Block> {
    if (this.latestBlock) {
      return this.latestBlock
    }
    if (this.latestBlockPromise) {
      return this.latestBlockPromise
    }
    this.latestBlockPromise = new Primrose<Block>()
    return this.latestBlockPromise
  }

}
