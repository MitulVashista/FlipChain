import Web3 from "web3";

let web3;

if (window.ethereum !== undefined) {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${import.meta.env.VITE_SEPOLIA_API_KEY}`
  );
  web3 = new Web3(provider);
}
export default web3;
