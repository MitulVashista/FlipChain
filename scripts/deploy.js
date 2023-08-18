const hre = require("hardhat");

async function main() {
  const flipkart = await hre.ethers.getContractFactory("FlipKart");
  const flipkartInstance = await flipkart.deploy(720000000000);
  await flipkartInstance.waitForDeployment();
  console.log("flipkartInstance deployed at:", flipkartInstance.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
