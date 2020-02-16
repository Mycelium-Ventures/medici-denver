 namehash = require('eth-ens-namehash');

const tables = [
    'hashes',
    'twitchId', 
    'video',
    'address',
    'address.id.twitchId', 
    'video.id.twitchId',
    'video.id.twitchId.id.time',
    'twitchId.id.creatorContract'
]

tables.forEach((d) => {
    console.log(`${d}\n${namehash.hash(d)}`)
})
