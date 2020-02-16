import ERC20Test from "../contractsPatches/ERC20Test.json"
// import EventWatch from "../contractsPatches/EventWatch.json"
import ORMExternal from "../contractsPatches/ORMExternal.json"

const options = (provider) => ({
  web3: {
    block: false,
    customProvider: provider,
    fallback: {
      type: "ws",
      url: "wss://ropsten.infura.io/ws/v3/66117717d0b044a2a8c7fe221a0c0000"
    }
  },
  contracts: [ERC20Test, ORMExternal],
  events: {
    EventWatch: [
      // EventWatch
      // "0xc9ecad6eae30b69c2e49bd1e68726ae8e5fa2b62ca116cb070225cccba5b3719",

      // ORMExternal.addTable
      "0xa8c762fae9757a7aefaa4d2026c9b16af3b1265f3374ed7a689d0336795ee27c",

      // ORMExternal.addRow
      "0x060df603306baa87050778b5ce94a1a38056c1ac5b1a7df3ee860c699662731b",

      // ORMExternal.removeRow
      "c5d91f356cea4a2933ed9f78ec87b4f91a05986ee2a3154f0bd20bfad9d1b3b8"
    ]
  },
  polls: {
    accounts: 5000
  }
})

export default options
