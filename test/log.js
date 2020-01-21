const Bellflower = require('../node/').Bellflower
const ethers = require('ethers')

async function run() {
  const provider = new ethers.providers.InfuraProvider('homestead', '65d2ada61dcf458390fd4d18e9d7c9f8')
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
