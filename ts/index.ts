import ethers from 'ethers'
import { Snowdrop } from 'pollenium-snowdrop'
import { Bytes32, Uint256 } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'
import { Uu } from 'pollenium-uvaursi'

export class Bellflower {

  private latestBlockIndex: Uint256
  private latestBlockIndexPrimrose: Primrose<Uint256>
  readonly blockIndexSnowdrop: Snowdrop<Uint256> = new Snowdrop<Uint256>()


  constructor(readonly provider: ethers.providers.Provider) {
    this.linkProviderOnBlock()
  }


  private linkProviderOnBlock() {
    this.provider.on('block', async (blockIndexNumber: number) => {
      const blockIndex = new Uint256(blockIndexNumber)
      this.setLatestBlockIndex(new Uint256(blockIndexNumber))
      this.blockIndexSnowdrop.emit(blockIndex)
    })
  }

  async fetchLatestBlockIndex(): Promise<Uint256> {
    if (this.latestBlockIndex) {
      return this.latestBlockIndex
    }
    if (this.latestBlockIndexPrimrose) {
      return this.latestBlockIndexPrimrose.promise
    }
    this.latestBlockIndexPrimrose = new Primrose<Uint256>()

    this.provider.getBlockNumber().then((blockIndexNumber: number) => {
      const blockIndex = new Uint256(blockIndexNumber)
      this.setLatestBlockIndex(new Uint256(blockIndexNumber))
    })

    return this.latestBlockIndexPrimrose.promise
  }

  private setLatestBlockIndex(blockIndex: Uint256) {
    this.latestBlockIndex = blockIndex

    if (this.latestBlockIndexPrimrose) {
      this.latestBlockIndexPrimrose.resolve(blockIndex)
      delete this.latestBlockIndexPrimrose
    }
  }

}
