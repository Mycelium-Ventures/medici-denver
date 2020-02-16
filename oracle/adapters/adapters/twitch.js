const namehash = require('eth-ens-namehash')
//const hash1 = namehash.hash('video.id.user.id.start')
//onst hash1 = namehash.hash('video.id.user.id.end')
// '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'

module.exports.oauth = async ({
    id,
    data
}) => { 
    const { twitchId, address } = data;
    if (!twitchId) { throw Error("Missing twitchId."); }
    if (!address) { throw Error("Missing address."); }

    const maskedData = mask(data, path);
    return { 
        statusCode: 200, 
        body: {
            jobRunID: id,
            data: maskedData //Do not modify
        }
    }
}