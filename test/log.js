const Bellflower = require('../node/').Bellflower
const ethers = require('ethers')
const dotenv = require('dotenv')

dotenv.config()

const { INFURA_SECRET } = process.env

async function run() {
  const provider = new ethers.providers.InfuraProvider('homestead', INFURA_SECRET)
  const bellflower = new Bellflower(provider)

  bellflower.blockSnowdrop.addHandle((block) => {
    console.log('new', block.number, block.timestamp, block.hash.getHex())
  })

  setInterval(() => {
    bellflower.fetchLatestBlock().then((block) => {
      console.log('latest', block.number, block.timestamp, block.hash.getHex())
    })
  }, 1000)

}

run()
