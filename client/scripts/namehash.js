const namehash = require('eth-ens-namehash')

console.log(namehash.hash('viewer'))
console.log(namehash.hash('viewer.0xfEB943725Ed070e8D5645736484Ba6494dcBA31a.clarenceTest')) // wrong value

console.log(namehash.hash('viewer.0xfEB943725Ed070e8D5645736484Ba6494dcBA31a'))

