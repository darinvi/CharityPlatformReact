// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface CampaignInterface is IERC20 {
    function mint(address to, uint amount) external;
    function maxSupply() external returns(uint);
    function deadline() external returns(uint);
    function creator() external returns(address);
}