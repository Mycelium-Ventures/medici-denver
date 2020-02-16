 namehash = require('eth-ens-namehash');

let t1 = namehash.hash('twitchId')
t1 = namehash.hash('video')

t1 = namehash.hash('address')
t1 = namehash.hash('address.<id>.twitchId')
t1 = namehash.hash('address.<id>.fortmatic')

t1 = namehash.hash('video.<id>.twitchId')
t1 = namehash.hash('video.<id>.twitchId.<id>.time')

t1 = namehash.hash('twitchId.<id>.creatorContract')

