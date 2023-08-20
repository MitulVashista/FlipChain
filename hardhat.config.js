require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.12",
  networks: {
    polygon_mumbai: {
      url: process.env.VITE_POLYGON_MUMBAI_TESTNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1,
    },
    viaIR: true,
  },
};
