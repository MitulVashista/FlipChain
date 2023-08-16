//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FlipKart {
    struct Brand {
        string id;
        string name;
        string category;
        address payable owner;
        Product[] products;
        Reward[] rewards;
        bool isIssuingTokens;
        uint rewardTokensLeft;
        uint rewardPricePercentage;
        uint[][] rewardMilestones;
    }
    struct Product {
        string id;
        string name;
        string category;
        uint price;
        bool available;
    }

    struct Reward {
        string id;
        string brandId;
        uint discount;
        uint maxDiscountPrice;
        uint tokensRequired;
    }

    struct RedeemableReward {
        string rewardId;
        string redeemCode;
    }

    struct User {
        string id;
        string name;
        address account;
        UserTransaction[] purchaseHistory;
        RedeemableReward[] rewardsObtained;
        string referralCode;
    }

    struct UserTransaction {
        string id;
        string brandId;
        string productId;
        string userId;
        uint expenditure;
        uint tokensRedeemed;
        string rewardRedeemed;
    }

    string[] public brands;
    mapping(string => Brand) public brandDetails;
    mapping(string => mapping(string => Product)) public productDetails;
    mapping(address => User) public userDetails;
    mapping(string => mapping(string => uint)) userBrandPurchaseAmount;
    mapping(string => address) referrerUserAddress;
    mapping(string => Reward) rewards;
    mapping(string => string) redeemableRewardId;
    mapping(string => mapping(string => bool)) userRewardInvalidity;
    mapping(string => mapping(string => bool)) redeemableRewardValidity;

    address private token;
    uint private tokenValue;

    constructor(uint value) {
        token = address(new FlipToken());
        tokenValue = value;
    }

    function generateRandomCode() private view returns (string memory) {
        bytes memory randomBytes = new bytes(6);
        for (uint i = 0; i < 6; i++) {
            uint8 randomValue = uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.prevrandao, i)
                    )
                ) % 10
            );
            randomBytes[i] = bytes1(uint8(48 + randomValue));
        }
        return string(randomBytes);
    }

    function registerBrand(
        string memory name,
        string memory category,
        uint rewardPricePercentage,
        uint[][] memory rewardMilestones
    ) public payable {
        require(msg.value == 98000000000000000);
        string memory id = Strings.toHexString(
            uint256(keccak256(abi.encodePacked(name, msg.sender))),
            32
        );
        require(brandDetails[id].owner != msg.sender);
        brands.push(id);
        brandDetails[id].id = id;
        brandDetails[id].name = name;
        brandDetails[id].category = category;
        brandDetails[id].owner = payable(msg.sender);
        brandDetails[id].rewardPricePercentage = rewardPricePercentage;
        brandDetails[id].rewardMilestones = rewardMilestones;
    }

    function issueTokens(string memory brandId, uint tokens) public {
        require(brandDetails[brandId].owner == msg.sender);
        uint tokensToBeIssued = tokens * (10 ** 18);
        require(tokensToBeIssued <= showBalance(brandDetails[brandId].owner));
        FlipToken(token).approve(msg.sender, tokensToBeIssued);
        brandDetails[brandId].isIssuingTokens = true;
        brandDetails[brandId].rewardTokensLeft += tokensToBeIssued;
    }

    function addProduct(
        string memory brandId,
        string memory name,
        string memory category,
        uint price
    ) public {
        require(brandDetails[brandId].owner == msg.sender);
        string memory productId = Strings.toHexString(
            uint256(
                keccak256(abi.encodePacked(name, msg.sender, block.timestamp))
            ),
            32
        );
        Product memory product = Product({
            id: productId,
            name: name,
            category: category,
            price: price,
            available: true
        });
        brandDetails[brandId].products.push(product);
        productDetails[brandId][productId] = product;
    }

    function registerUser(string memory name, string memory _referral) public {
        require(userDetails[msg.sender].account == address(0));
        string memory id = Strings.toHexString(
            uint256(keccak256(abi.encodePacked(msg.sender))),
            32
        );
        userDetails[msg.sender].id = id;
        userDetails[msg.sender].name = name;
        userDetails[msg.sender].account = msg.sender;
        userDetails[msg.sender].referralCode = generateRandomCode();
        referrerUserAddress[userDetails[msg.sender].referralCode] = msg.sender;
        if (referrerUserAddress[_referral] != address(0)) {
            FlipToken(token).mint(50 * (10 ** 18));
            FlipToken(token).transfer(
                referrerUserAddress[_referral],
                50 * (10 ** 18)
            );
        }
    }

    function buyTokens(string memory brandId) public payable {
        require(brandDetails[brandId].owner == msg.sender);
        uint tokensPurchased = (msg.value * (10 ** 18)) / tokenValue;
        FlipToken(token).mint(tokensPurchased);
        FlipToken(token).transfer(msg.sender, tokensPurchased);
    }

    function buyProduct(
        string memory brandId,
        string memory productId,
        bool isRedeemingTokens,
        string memory rewardRedeemCode
    ) public payable {
        require(userDetails[msg.sender].account == msg.sender);
        require(brandDetails[brandId].owner != address(0));
        require(productDetails[brandId][productId].available);
        uint priceToPay;
        uint tokensToBeRedeemed;
        string memory rewardRedeemed;
        Brand storage brand = brandDetails[brandId];
        if (isRedeemingTokens) {
            uint userBalance = showBalance(msg.sender);
            uint maxRedeemableTokens = (productDetails[brandId][productId]
                .price * (10 ** 18)) / (2 * tokenValue);

            if (userBalance < maxRedeemableTokens) {
                tokensToBeRedeemed = userBalance / (10 ** 18);
            } else {
                tokensToBeRedeemed = maxRedeemableTokens / (10 ** 18);
            }
            priceToPay =
                productDetails[brandId][productId].price -
                (tokensToBeRedeemed * tokenValue);
        } else {
            priceToPay = productDetails[brandId][productId].price;
            tokensToBeRedeemed = 0;
        }

        if (
            redeemableRewardValidity[userDetails[msg.sender].id][
                rewardRedeemCode
            ] == true
        ) {
            Reward memory reward = rewards[
                redeemableRewardId[rewardRedeemCode]
            ];
            if (
                (reward.discount * priceToPay) / 100 <= reward.maxDiscountPrice
            ) {
                priceToPay -= (reward.discount * priceToPay) / 100;
            } else {
                priceToPay -= reward.maxDiscountPrice;
            }
        }

        require(msg.value == priceToPay);

        if (
            redeemableRewardValidity[userDetails[msg.sender].id][
                rewardRedeemCode
            ] == true
        ) {
            redeemableRewardValidity[userDetails[msg.sender].id][
                rewardRedeemCode
            ] = false;
            rewardRedeemed = rewards[redeemableRewardId[rewardRedeemCode]].id;
        }

        uint costToPlatform = priceToPay / 10;
        brand.owner.transfer(msg.value - costToPlatform);
        userBrandPurchaseAmount[userDetails[msg.sender].id][
            brandId
        ] += priceToPay;
        UserTransaction memory transaction = UserTransaction({
            id: Strings.toHexString(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            userDetails[msg.sender].id,
                            productId,
                            block.timestamp
                        )
                    )
                ),
                32
            ),
            brandId: brandId,
            productId: productId,
            userId: userDetails[msg.sender].id,
            expenditure: msg.value,
            tokensRedeemed: tokensToBeRedeemed,
            rewardRedeemed: rewardRedeemed
        });
        userDetails[msg.sender].purchaseHistory.push(transaction);
        FlipToken(token).approve(msg.sender, tokensToBeRedeemed * (10 ** 18));
        FlipToken(token).transferFrom(
            msg.sender,
            brand.owner,
            tokensToBeRedeemed * (10 ** 18)
        );
        if (userDetails[msg.sender].purchaseHistory.length == 1) {
            FlipToken(token).mint(100 * (10 ** 18));
            FlipToken(token).transfer(msg.sender, 100 * (10 ** 18));
        }
        uint rewardTokens = (priceToPay * (10 ** 18)) / (5 * tokenValue);
        FlipToken(token).mint(rewardTokens);
        FlipToken(token).transfer(msg.sender, rewardTokens);
        uint userPurchaseAmount = userBrandPurchaseAmount[
            userDetails[msg.sender].id
        ][brandId];
        if (brand.isIssuingTokens && brand.rewardTokensLeft > 0) {
            for (uint i = 0; i < brand.rewardMilestones.length; i++) {
                if (
                    userPurchaseAmount > brand.rewardMilestones[i][0] &&
                    (brand.rewardMilestones[i][1] == 0 ||
                        userPurchaseAmount <= brand.rewardMilestones[i][1])
                ) {
                    uint issuableBrandRewardTokens = (priceToPay *
                        brand.rewardPricePercentage *
                        brand.rewardMilestones[i][2] *
                        (10 ** 18)) / (100 * tokenValue);
                    if (brand.rewardTokensLeft <= issuableBrandRewardTokens) {
                        FlipToken(token).transferFrom(
                            brand.owner,
                            msg.sender,
                            brand.rewardTokensLeft
                        );
                        brandDetails[brandId].rewardTokensLeft = 0;
                        brandDetails[brandId].isIssuingTokens = false;
                    } else {
                        FlipToken(token).transferFrom(
                            brand.owner,
                            msg.sender,
                            issuableBrandRewardTokens
                        );
                        brandDetails[brandId]
                            .rewardTokensLeft -= issuableBrandRewardTokens;
                    }
                }
            }
        }
    }

    function createReward(
        string memory brandId,
        uint discount,
        uint maxDiscountValue,
        uint tokens
    ) public {
        require(brandDetails[brandId].owner == msg.sender);
        string memory id = Strings.toHexString(
            uint256(keccak256(abi.encodePacked(brandId, block.timestamp))),
            32
        );
        Reward memory reward = Reward({
            id: id,
            brandId: brandId,
            discount: discount,
            maxDiscountPrice: maxDiscountValue,
            tokensRequired: tokens
        });
        rewards[id] = reward;
        brandDetails[brandId].rewards.push(reward);
    }

    function issueReward(string memory rewardId) public {
        require(
            userRewardInvalidity[rewardId][userDetails[msg.sender].id] == false
        );
        RedeemableReward memory reward = RedeemableReward({
            rewardId: rewardId,
            redeemCode: generateRandomCode()
        });
        redeemableRewardValidity[userDetails[msg.sender].id][
            reward.redeemCode
        ] = true;
        redeemableRewardId[reward.redeemCode] = rewardId;
        userDetails[msg.sender].rewardsObtained.push(reward);
        userRewardInvalidity[rewardId][userDetails[msg.sender].id] = true;
        FlipToken(token).approve(
            msg.sender,
            rewards[rewardId].tokensRequired * (10 ** 18)
        );
        FlipToken(token).transferFrom(
            msg.sender,
            brandDetails[rewards[rewardId].brandId].owner,
            rewards[rewardId].tokensRequired * (10 ** 18)
        );
    }

    function showBrandProducts(
        string memory brandId
    ) public view returns (Product[] memory) {
        return brandDetails[brandId].products;
    }

    function showBrandProductDetails(
        string memory brandId,
        string memory productId
    ) public view returns (Product memory) {
        return productDetails[brandId][productId];
    }

    function showUserPurchaseHistory(
        address account
    ) public view returns (UserTransaction[] memory) {
        return userDetails[account].purchaseHistory;
    }

    function showBalance(address account) public view returns (uint) {
        return FlipToken(token).balanceOf(account);
    }
}
