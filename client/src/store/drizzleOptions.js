import ERC20Test from "../contractsPatches/ERC20Test.json"
import EventWatch from "../contractsPatches/EventWatch.json"

const options = (provider) => ({
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "wss://ropsten.infura.io/ws/v3/66117717d0b044a2a8c7fe221a0c0000"
    }
  },
  contracts: [ERC20Test, EventWatch],
  events: {
    EventWatch: ["0xc9ecad6eae30b69c2e49bd1e68726ae8e5fa2b62ca116cb070225cccba5b3719"]
  },
  polls: {
    accounts: 1500
  }
})

export default options
