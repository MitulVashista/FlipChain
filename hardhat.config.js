require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.12",
  networks: {
    sepolia: {
      url: process.env.VITE_INFURA_SEPOLIA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
      network_id: 11155111,
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
