import { ethers } from "ethers";
import { abi } from "../artifacts/contracts/FlipKart.sol/FlipKart.json";

let flipkartInstance;

if (window.ethereum) {
  const provider = new ethers.BrowserProvider(window.ethereum);

  // get the end user
  const signer = await provider.getSigner();
  // get the smart contract
  flipkartInstance = new ethers.Contract(
    import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS,
    abi,
    signer
  );
} else {
  const provider = ethers.getDefaultProvider(
    import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT
  );
  flipkartInstance = new ethers.Contract(
    import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS,
    abi,
    provider
  );
}

export default flipkartInstance;
