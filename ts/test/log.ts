import { Bellflower } from '../'
import { ethers } from 'ethers'

declare module console {
  export function log(...args: any): void
}

declare function setInterval(func: ()=>void, interval: number): void

async function run() {
  const provider = new ethers.providers.InfuraProvider('homestead', '65d2ada61dcf458390fd4d18e9d7c9f8')
  const bellflower = new Bellflower(provider)

  bellflower.fetchLatestBlockIndex().then((blockIndex) => {
    console.log('latest', blockIndex.toNumberString(10))
  })

  bellflower.blockIndexSnowdrop.addHandle((blockIndex) => {
    console.log('new', blockIndex.toNumberString(10))
  })

  setInterval(() => {
    bellflower.fetchLatestBlockIndex().then((blockIndex) => {
      console.log('latest', blockIndex.toNumberString(10))
    })
  }, 1000)

}

run()
