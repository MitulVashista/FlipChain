//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token.sol";

contract FlipKart {
    address private token;
    constructor(){
        token = address(new FlipToken());
    }
}
