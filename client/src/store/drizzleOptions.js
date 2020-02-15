// import ERC20Token from "./contracts/ERC20Token.json"
// import CrowdsaleSimple from "./contracts/CrowdsaleSimple.json"

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545"
    }
  },
  contracts: [], // [ERC20Token, CrowdsaleSimple],
  events: {
    // ERC20Token: ["Transfer", "Approval"]
  },
  polls: {
    accounts: 1500
  }
}

export default options
