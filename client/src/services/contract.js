import drizzle from '../store/index'
import namehash from 'eth-ens-namehash'
import { fmWeb3 } from '../store'

import contract_config from "../contract_config.json";
import ERC20Test from "../contracts/ERC20Test.json"



export const getBalance = async (ethAddress) => {
    const contractInstance = new fmWeb3.eth.Contract(ERC20Test.abi, contract_config.ORM_address)
    try {
        var res = await contractInstance.methods.balanceOf(ethAddress).call();
    }
    catch(err) {
        console.log(err)
        return 0;
    }
    return res;
}


export const createTable = (name) => {
    console.log(name);
    return async function(dispatch, getState, {fmWeb3}){
        let state = getState()

        console.log("top")
        const ORMContract = drizzle.contracts.ORMExternal;
        const tableHash = namehash.hash(name)

        console.log(name, tableHash)
        const addTableStackId = ORMContract.methods.addTable.cacheSend(tableHash)
        const addTableTxHash = await new Promise((resolve) => {
            const interval = setInterval(() => {
                state = getState()
                const txHash = state.transactionStack[addTableStackId]
                if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){
                    clearInterval(interval)
                    resolve(txHash)
                }
                console.log(state.transactions[txHash].status)
            }, 1500)
        })
        return Promise.resolve(tableHash);
    }
}

export const addAddressToTable = (tableHash, ethAddress) => {
    return async function(dispatch, getState, {fmWeb3}) {
        const ORMContract = drizzle.contracts.ORMExternal;
        let state = getState()
        // const viewerTwitchId = namehash.hash(`viewer.${ethAddress}.clarenceTest`)
        const addStackId = ORMContract.methods.add.cacheSend(tableHash, ethAddress)
        const addTxHash = await new Promise((resolve) => {
            const interval = setInterval(() => {
                state = getState()
                const txHash = state.transactionStack[addStackId]
                if (state.transactions[txHash] && state.transactions[txHash].status === 'success'){
                    clearInterval(interval)
                    resolve(txHash)
                }
                // console.log(state.transactions[txHash].status)
            }, 1500)
        })
        return Promise.resolve()
    }
}