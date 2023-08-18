import { ethers } from "ethers";
import flipkartInstance from "../scripts/interact";

export async function registerBrand(
  name,
  category,
  rewardPricePercentage,
  rewardMilestones
) {
  try {
    const tx = await flipkartInstance.registerBrand(
      name,
      category,
      rewardPricePercentage,
      rewardMilestones,
      { value: ethers.parseEther("0.098") }
    );
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error registering the brand!");
  }
}

export async function registerUser(name, referralCode) {
  try {
    const tx = await flipkartInstance.registerUser(name, referralCode);
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error registering the user!");
  }
}

export async function getBrandsData() {
  try {
    const brandId = await flipkartInstance.brands(0);
    const brandDetails = await flipkartInstance.brandDetails(brandId);

    console.log(brandDetails);
    return brandDetails;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching brands data!");
  }
}
