const Web3 = require('web3');
const web3 =  new Web3();

module.exports.default = async ({id, data}) => { 
    const { jsonInterface, parameters } = data
    const value = web3.eth.abi.encodeFunctionCall(jsonInterface, parameters);
    data.value = value;

    delete data.jsonInterface; //Consume
    delete data.parameters;    //Consume

    return { 
        statusCode: 200, 
        body: {
            jobRunID: id,
            data: data
        }
    };
}