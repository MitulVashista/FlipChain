//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token.sol";

contract FlipKart {
    address private tokenContract;
    address private owner;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 loyaltyPointsCost;
    }

    struct Brand {
        uint256 id;
        string name;
        address brandAddress;
        mapping(uint256 => Product) products;
        mapping(string => uint256) productsByName;
        uint256 productCount;
        uint256 wallet; 
    }

    struct User {
        uint256 id;
        string name;
        address userAddress;
        uint256 wallet;
        string referralCode;
    }

    mapping(address => User) public users;
    mapping(address => Brand) public brands;
    mapping(string => address) private brandsByName;
    mapping(string => address) private usersByreferralCodes;

    mapping(address => mapping(address => uint256)) public userBrandTransactions;
    mapping(address => uint256) public userTotalTransactions;

    event UserRegistered(address indexed userAddress, string name);
    event BrandRegistered(address indexed brandAddress, string name);
    event ProductAdded(address indexed brandAddress, string brandName, string productName);
    event ProductBought(address indexed userAddress, string userName, address indexed brandAddress, string brandName, string productName, uint256 price, uint256 discount, uint256 tokensEarned);
    event RewardIssued(address indexed brandAddress, address indexed userAddress, uint256 rewardAmount);

    constructor() {
        tokenContract = address(new FlipToken());
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function generateRandomReferralCode() private view returns (string memory) {
        bytes memory randomBytes = new bytes(6);
        for (uint i = 0; i < 6; i++) {
            uint8 randomValue = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, i))) % 10);
            randomBytes[i] = bytes1(uint8(48 + randomValue));
        }
        return string(randomBytes);
    }

    function registerUser(string memory _name, string memory _referralCode) external {
        require(users[msg.sender].userAddress == address(0), "User already registered");
        uint256 userId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        string memory referralCode = generateRandomReferralCode();
        users[msg.sender] = User(userId, _name, msg.sender, 1000, referralCode);
        usersByreferralCodes[referralCode] = msg.sender;

        if (bytes(_referralCode).length > 0) {
            address referrerAddress = usersByreferralCodes[_referralCode];
            if (referrerAddress != address(0)) {
                FlipToken(tokenContract).mint(150);
                FlipToken(tokenContract).transfer(referrerAddress, 100);
                FlipToken(tokenContract).transfer(msg.sender, 50);
            }
        }
        
        emit UserRegistered(msg.sender, _name);
    }

    function registerBrand(string memory _name) external {
        require(brands[msg.sender].brandAddress == address(0), "Brand already registered");
        uint256 brandId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        
        brands[msg.sender].id = brandId;
        brands[msg.sender].name = _name;
        brands[msg.sender].brandAddress = msg.sender;
        brands[msg.sender].productCount = 0;
        brands[msg.sender].wallet = 1000;
        brandsByName[_name] = msg.sender;
        
        emit BrandRegistered(msg.sender, _name);
    }

    function addProduct(string memory _productName, uint256 _price, uint256 _loyaltyPointsCost) external {
        require(bytes(_productName).length > 0, "Product name must not be empty");
        require(_price > 0, "Product price must be greater than 0");
        require(_loyaltyPointsCost <= _price / 2, "Loyalty points cost cannot exceed 50% of product price");
        require(brands[msg.sender].brandAddress != address(0), "Only registered brands can add products");

        Brand storage brand = brands[msg.sender];
        uint256 productId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        brand.products[productId] = Product(productId, _productName, _price, _loyaltyPointsCost);
        brand.productsByName[_productName] = productId;
        brand.productCount++;

        emit ProductAdded(msg.sender, brand.name, _productName);
    }

    function buyProduct(string memory _brandName, string memory _productName) external {
        require(users[msg.sender].userAddress != address(0), "Only registered users can buy products");
        
        Brand storage brand = brands[brandsByName[_brandName]];
        require(brand.brandAddress != address(0), "Brand not found");
        
        uint256 productId = brand.productsByName[_productName];
        require(productId != 0, "Product not found");

        User storage user = users[msg.sender];
        Product storage product = brand.products[productId];

        uint256 discountAmount;
        uint256 discountTokens;

        uint256 userLoyaltyPoints = FlipToken(tokenContract).balanceOf(msg.sender);

        if (userLoyaltyPoints < product.loyaltyPointsCost / 2) {
            discountAmount = userLoyaltyPoints * product.price / product.loyaltyPointsCost;
            discountTokens = userLoyaltyPoints;
        }

        else {
            discountAmount = product.price / 2;
            discountTokens = product.loyaltyPointsCost / 2;
        }

        uint256 finalPrice = product.price - discountAmount;

        if (user.wallet < finalPrice) {
            revert("Insufficient balance");
        }

        uint256 tokenEarned = finalPrice / 10;

        FlipToken(tokenContract).approve(msg.sender, discountTokens);
        FlipToken(tokenContract).transferFrom(msg.sender, address(this), discountTokens);   

        userTotalTransactions[msg.sender]++;
        userBrandTransactions[msg.sender][brandsByName[_brandName]]++;

        if (userTotalTransactions[msg.sender] % 5 == 0) {
            uint256 transactionReward = userTotalTransactions[msg.sender];
            tokenEarned += transactionReward;
        }

        if (userBrandTransactions[msg.sender][brandsByName[_brandName]] % 5 == 0) {
            uint256 brandTransactionReward = userBrandTransactions[msg.sender][brandsByName[_brandName]];
            tokenEarned += brandTransactionReward;
        }

        FlipToken(tokenContract).mint(tokenEarned);
        FlipToken(tokenContract).transfer(msg.sender, tokenEarned); 

        // Actual Cryptocurrency transaction takes place here

        user.wallet -= finalPrice;
        brand.wallet += finalPrice;  

        emit ProductBought(msg.sender, user.name, brand.brandAddress, brand.name, _productName, finalPrice, discountTokens, tokenEarned);    
    }

    function displayBalance(address account) public view returns(uint) {
        return FlipToken(tokenContract).balanceOf(account);
    }

    function displayReferralCode(address account) public view returns(string memory) {
        return users[account].referralCode;
    }

    function displayUserWallet(address account) public view returns(uint) {
        return users[account].wallet;
    }

    function displayBrandWallet(address account) public view returns(uint) {
        return brands[account].wallet;
    }

    function issueReward(address _userAddress, uint256 _rewardAmount) external {
        require(brands[msg.sender].brandAddress != address(0), "Only registered brands can issue rewards");

        User storage user = users[_userAddress];
        require(user.userAddress != address(0), "User not found");

        FlipToken(tokenContract).mint(_rewardAmount);
        FlipToken(tokenContract).transfer(_userAddress, _rewardAmount);

        emit RewardIssued(msg.sender, _userAddress, _rewardAmount);
    }
}
