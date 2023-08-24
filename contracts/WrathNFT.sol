// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WrathNFT is ERC721 {
    uint16 public immutable MAX_SUPPLY = 10000;
    uint256 public immutable MINT_PRICE = 0.5 ether;

    uint16 public currentSupply = 0;

    constructor() ERC721("WrathNFT", "War") {}

    function mint() external payable returns (uint16) {
        require(msg.value >= MINT_PRICE, "Not enough ether sent"); //Check if enough ether is sent
        require(currentSupply < MAX_SUPPLY, "Max supply reached");

        currentSupply += 1;

        _safeMint(msg.sender, currentSupply);

        return currentSupply;
    }

    function burn(uint256 tokenId) external {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Caller is not owner nor approved"
        );

        _burn(tokenId);
    }
}
