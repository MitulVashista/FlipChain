import web3 from "./web3";

import FactoryCampaign from "./build/FlipKart.json";

const flipkartInstance = new web3.eth.Contract(
  FlipKart.abi,
  import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS
);

export default flipkartInstance;
