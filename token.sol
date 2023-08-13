//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlipToken is ERC20("FlipCoin", "FPC"), Ownable{

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function transfer(address to, uint256 value) public onlyOwner virtual override  returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function approve(address owner, uint256 value) public onlyOwner virtual override  returns (bool) {
        address spender = _msgSender();
        _approve(owner, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public onlyOwner virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}