require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./build/FactoryCampaign.json");
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
const provider = new HDWalletProvider(
  process.env.METAMASK_MNEMONIC,
  `https://sepolia.infura.io/v3/${process.env.VITE_SEPOLIA_API_KEY}`
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account ", accounts[0]);
  const canmpaignFactory = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "15000000" });
  console.log("Contract deployed to ", canmpaignFactory.options.address);
  provider.engine.stop();
};

deploy();
