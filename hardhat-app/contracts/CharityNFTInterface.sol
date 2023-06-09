// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface CharityNFTInterface is IERC721 {
    function createNFT(address to, string memory uri) external;
}