//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FlipToken.sol";

contract FlipKart {
    address private token;
    constructor(){
        token = address(new FlipToken());
    }
}
