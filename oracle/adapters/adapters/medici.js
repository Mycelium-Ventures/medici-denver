
//authorizeUser
module.exports.authorizeUser = async ({ id, data }) => {
    const { address } = data
    return {
        statusCode: 200,
        body: {
            jobRunID: id,
            data: { "parameters": [[address]] } //Format for web3 encoding
        }
    }
}

//authorizeChannel
module.exports.authorizeChannel = async ({ id, data }) => {
    const { address } = data
    return {
        statusCode: 200,
        body: {
            jobRunID: id,
            data: { "parameters": [[address]] } //Format for web3 encoding
        }
    }
}

//Sync data
module.exports.syncLikes = async ({ id, data }) => {

}

module.exports.syncSubscribers = async ({ id, data }) => {

}

module.exports.syncVideos = async ({ id, data }) => {

}