// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./CharityNFT.sol";
import "./CharityNFTInterface.sol";
import "./CampaignInterface.sol";

contract Campaign is ERC20, Ownable, CampaignInterface {

    string public description;
    uint public maxSupply;
    uint public deadline;
    address public creator;
    address public donatorBonusNFT; 

    constructor(
        string memory name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _duration,
        address _creator
    ) ERC20 (name, "MTK") {
        description = _description;
        maxSupply = _fundingGoal;
        deadline = block.timestamp + _duration;
        creator = _creator;
        donatorBonusNFT = address(new CharityNFT(name));
    }

    function mint(address to, uint256 amount) public onlyOwner() {
        _mint(to, amount);
        CharityNFTInterface(donatorBonusNFT).createNFT(to,"some uri");
    }

}