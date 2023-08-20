import { ethers } from "ethers";
import { flipkartInstance, signer } from "../scripts/interact";
import JSBI from "jsbi";

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
    const brandIds = await flipkartInstance.showBrands();
    const brandsDetails = await Promise.all(
      Array(brandIds.length)
        .fill()
        .map((brandId, idx) => {
          return flipkartInstance.brandDetails(brandIds[idx]);
        })
    );
    const productsDetails = await Promise.all(
      Array(brandIds.length)
        .fill()
        .map((brandId, idx) => {
          return flipkartInstance.showBrandProducts(brandIds[idx]);
        })
    );
    return { brandsDetails, productsDetails };
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching brands data!");
  }
}

export async function getBrandData() {
  try {
    const brandId = await flipkartInstance.brandIds(signer.address);
    const brandData = await flipkartInstance.brandDetails(brandId);
    const ownerTokenBalance =
      (await flipkartInstance.showBalance(brandData[3])) / BigInt(10 ** 18);
    return { brandData, ownerTokenBalance };
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching brands data!");
  }
}

export async function buyTokens(brandId, amount) {
  try {
    const tx = await flipkartInstance.buyTokens(brandId, {
      value: ethers.parseEther(amount),
    });
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error buying tokens!");
  }
}

export async function issueTokens(brandId, tokens) {
  try {
    const tx = await flipkartInstance.issueTokens(brandId, tokens);
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error issuing tokens!");
  }
}

export async function addProduct(brandId, name, category, imageUrl, price) {
  try {
    const tx = await flipkartInstance.addProduct(
      brandId,
      name,
      category,
      imageUrl,
      ethers.parseEther(price)
    );
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error adding the product!");
  }
}

export async function getBrandProductsData(brandId) {
  try {
    const products = await flipkartInstance.showBrandProducts(brandId);
    return products;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching products data!");
  }
}

export async function addReward(brandId, discount, maxDiscountValue, tokens) {
  try {
    const tx = await flipkartInstance.createReward(
      brandId,
      discount,
      maxDiscountValue,
      tokens
    );
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error adding the reward!");
  }
}

export async function getBrandRewardsData(brandId) {
  try {
    const rewardsIds = await flipkartInstance.showBrandRewards(brandId);
    return rewardsIds;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching rewards data!");
  }
}

export async function getProductData(productId) {
  try {
    const product = await flipkartInstance.productDetails(productId);
    return product;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching product data!");
  }
}

export async function checkRedeemableTokens(productPrice) {
  try {
    let tokensToBeRedeemed;
    const userBalance = BigInt(
      await flipkartInstance.showBalance(signer.address)
    );
    let maxRedeemableTokens =
      (BigInt(ethers.parseEther(productPrice)) * BigInt(10 ** 18)) /
      BigInt(2 * 720000000000);

    if (userBalance < maxRedeemableTokens) {
      tokensToBeRedeemed = userBalance / BigInt(10 ** 18);
    } else {
      tokensToBeRedeemed = maxRedeemableTokens / BigInt(10 ** 18);
    }
    let priceToPay =
      BigInt(ethers.parseEther(productPrice)) -
      tokensToBeRedeemed * BigInt(720000000000);
    return JSBI.BigInt(parseInt(priceToPay)) / JSBI.BigInt(10 ** 18);
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error checking redeemable tokens!");
  }
}

export async function buyProduct(
  brandId,
  productId,
  isRedeemingTokens,
  rewardRedeemCode,
  amount
) {
  try {
    const tx = await flipkartInstance.buyProduct(
      brandId,
      productId,
      isRedeemingTokens,
      rewardRedeemCode,
      { value: ethers.parseEther(amount) }
    );
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error buying the product!");
  }
}

export async function getUserData() {
  try {
    const userDetails = await flipkartInstance.userDetails(signer.address);
    const userTokenBalance =
      JSBI.BigInt(
        parseInt(await flipkartInstance.showBalance(signer.address))
      ) / JSBI.BigInt(10 ** 18);
    return { userDetails, userTokenBalance };
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user data!");
  }
}

export async function isUser() {
  try {
    const userDetails = await flipkartInstance.userDetails(signer.address);
    return userDetails[2] != "0x0000000000000000000000000000000000000000";
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user data!");
  }
}

export async function isBrand() {
  try {
    const brandId = await flipkartInstance.brandIds(signer.address);
    const brandDetails = await flipkartInstance.brandDetails(brandId);
    return brandDetails[3] != "0x0000000000000000000000000000000000000000";
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user data!");
  }
}

export async function getUserPurchaseHistory() {
  try {
    const userPurchaseHistory = await flipkartInstance.showUserPurchaseHistory(
      signer.address
    );
    const brandDetails = await Promise.all(
      Array(userPurchaseHistory.length)
        .fill()
        .map((purchase, idx) => {
          return flipkartInstance.brandDetails(userPurchaseHistory[idx][1]);
        })
    );
    const brandNames = brandDetails.map((brand) => brand[1]);
    const productDetails = await Promise.all(
      Array(userPurchaseHistory.length)
        .fill()
        .map((purchase, idx) => {
          return flipkartInstance.productDetails(userPurchaseHistory[idx][2]);
        })
    );
    const productNames = productDetails.map((product) => product[1]);
    return { userPurchaseHistory, brandNames, productNames };
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user purchase History!");
  }
}

export async function issueReward(rewardId) {
  try {
    const tx = await flipkartInstance.issueReward(rewardId);
    await tx.wait();
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error issuing the reward!");
  }
}

export async function getRewardsData() {
  try {
    const brandIds = await flipkartInstance.showBrands();
    const brandDetails = await Promise.all(
      Array(brandIds.length)
        .fill()
        .map((brandId, idx) => {
          return flipkartInstance.brandDetails(brandIds[idx]);
        })
    );
    const brandNames = brandDetails.map((brand) => brand[1]);
    const brandsRewards = await Promise.all(
      Array(brandIds.length)
        .fill()
        .map((brandId, idx) => {
          return flipkartInstance.showBrandRewards(brandIds[idx]);
        })
    );
    return { brandsRewards, brandNames };
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching rewards data!");
  }
}

export async function getRedeemedPrice(rewardRedeemCode, priceToPay) {
  try {
    const price = await flipkartInstance.redeemReward(
      rewardRedeemCode,
      ethers.parseEther(String(priceToPay))
    );
    return price;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user data!");
  }
}

export async function getUserRewards() {
  try {
    const userRewards = await flipkartInstance.showUserRewards(signer.address);

    return userRewards;
  } catch (err) {
    console.log(err.message);
    console.error(err);
    throw new Error("There was some error fetching user's rewards data!");
  }
}
