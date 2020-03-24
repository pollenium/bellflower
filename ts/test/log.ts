import { Bellflower } from '../'
import { ethers } from 'ethers'

declare module console {
  export function log(...args: any): void
}

declare function setInterval(func: ()=>void, interval: number): void

async function run() {
  const provider = new ethers.providers.InfuraProvider('homestead', '65d2ada61dcf458390fd4d18e9d7c9f8')
  const bellflower = new Bellflower(provider)

  bellflower.blockSnowdrop.addHandle((block) => {
    console.log('new', block.number.toNumberString(10), block.timestamp.toNumberString(10), block.hash.uu.toHex())
  })

  setInterval(() => {
    bellflower.fetchLatestBlock().then((block) => {
      console.log('latest', block.number.toNumberString(10), block.timestamp.toNumberString(10), block.hash.uu.toHex())
    })
  }, 1000)

}

run()
