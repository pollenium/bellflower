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
  private latestBlockPrimrose: Primrose<Block>
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

      if (this.latestBlockPrimrose) {
        this.latestBlockPrimrose.resolve(this.latestBlock)
        delete this.latestBlockPrimrose
      }

      this.blockSnowdrop.emitIfHandle(this.latestBlock)
    })
  }

  private async fetchLatestBlock(): Promise<Block> {
    if (this.latestBlock) {
      return this.latestBlock
    }
    if (this.latestBlockPrimrose) {
      return this.latestBlockPrimrose
    }
    this.latestBlockPrimrose = new Primrose<Block>()

    const ethersBlock = await this.provider.getBlock('latest')
    this.latestBlock = {
      number: ethersBlock.number,
      hash: Bytes32.fromHexish(ethersBlock.hash),
      timestamp: ethersBlock.timestamp
    }


    return this.latestBlockPrimrose.promise
  }

}
