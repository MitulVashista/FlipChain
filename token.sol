//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
contract FlipToken is ERC20("flipCoin", "FP"),Ownable(msg.sender){
    function mint(uint supply) public onlyOwner {
        _mint(msg.sender, supply * 10**18);
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
