//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Token.sol";

contract FlipKart {
    address private token;
    constructor(){
        token = address(new FlipToken());
    }
}
