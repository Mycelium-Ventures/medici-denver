const namehash = require('eth-ens-namehash')

console.log(namehash.hash('viewer'))
console.log(namehash.hash('viewer.0xfEB943725Ed070e8D5645736484Ba6494dcBA31a.clarenceTest')) // wrong value

console.log(namehash.hash('viewer.0xfEB943725Ed070e8D5645736484Ba6494dcBA31a'))

console.log(namehash.hash('twitchId.1234.videoId.1234'))
console.log(namehash.hash('videoId.1234.twitchId.1234'))

