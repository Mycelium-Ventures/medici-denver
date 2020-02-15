// import ERC20Token from "./contracts/ERC20Token.json"
// import CrowdsaleSimple from "./contracts/CrowdsaleSimple.json"

const options = (provider) => ({
  web3: {
    block: false,
    customProvider: provider,
    fallback: {
      type: "ws",
      url: "ws://infura."
    }
  },
  contracts: [], // [ERC20Token, CrowdsaleSimple],
  events: {
    // ERC20Token: ["Transfer", "Approval"]
  },
  polls: {
    accounts: 1500
  }
})

export default options
