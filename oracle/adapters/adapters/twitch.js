const namehash = require('eth-ens-namehash')
const Web3 = require('web3');
const web3 = new Web3();

//const hash1 = namehash.hash('video.id.user.id.start')
//const hash1 = namehash.hash('video.id.user.id.end')
//'0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'

const walletHash = namehash.hash('wallet')
const twitchIdHash = namehash.hash('twitchId')

function bufferToBytes32(buffer) {
    const padding = new Buffer(32 - buffer.length);
    return Buffer.concat([padding, buffer])
}

module.exports.oauth = async ({
    id,
    data
}) => { 
    const { twitchId, ethAddress } = data;
    if (!twitchId) { throw Error("Missing twitchId."); }
    if (!ethAddress) { throw Error("Missing address."); }

    const address32Bytes = bufferToBytes32(Buffer.from(web3.utils.hexToBytes(ethAddress))).toString("hex");
    const twitchId32Bytes = bufferToBytes32(Buffer.from(twitchId, 'ascii')).toString("hex");
    
    const address32BytesString = address32Bytes.toString("hex");
    const walletTwitchIdHash = namehash.hash(`wallet.${address32BytesString}.twitchId`)
    
    const batchAdd = {
        "_table":[walletHash, twitchIdHash, walletTwitchIdHash],
        "_row": [address32Bytes, twitchId32Bytes, twitchId32Bytes]
    }

    return { 
        statusCode: 200, 
        body: {
            jobRunID: id,
            data: { parameters: batchAdd }
        }
    }
}

module.exports.subscriberReward = async ({
    id,
    data
}) => { 


}

module.exports.cheerReward = async ({
    id,
    data
}) => { 

}

module.exports.viewReward = async ({
    id,
    data
}) => {
    const { twitchId, videoId, startTime, endTime } = data;

    const twitchIdVideoHash = namehash.hash(`twitchId.${twitchId}.video.${videoId}.views`);
    const videoTwitchIdHash = namehash.hash(`video.${videoId}.twitchId.${twitchId}.views`);
    const time = endTime - startTime;
    const timeEncoded = '0x' + web3.eth.abi.encodeParameter('uint256', time);

    const batchAdd = {
        "_table":[twitchIdVideoHash, videoTwitchIdHash],
        "_row": [timeEncoded, timeEncoded]
    }

    return { 
        statusCode: 200, 
        body: {
            jobRunID: id,
            data: { parameters: batchAdd }
        }
    }
}