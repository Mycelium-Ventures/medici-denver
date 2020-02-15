import ERC20Test from "../contracts/ERC20Test.json"
// import CrowdsaleSimple from "./contracts/CrowdsaleSimple.json"

const options = (provider) => ({
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "wss://ropsten.infura.io/v3/66117717d0b044a2a8c7fe221a0c0000"
    }
  },
  contracts: [ERC20Test],
  polls: {
    accounts: 1500
  }
})

export default options
