// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LoopRoleNFT is ERC721, Ownable {
    constructor() ERC721("LoopRole", "ROLE") {}

    function mintRole(address to, uint256 roleId) external onlyOwner {
        _mint(to, roleId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0) || to == address(0), "Soulbound");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function approve(address, uint256) public pure override {
        revert("Soulbound");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound");
    }

    function transferFrom(address, address, uint256) public pure override {
        revert("Soulbound");
    }

    function safeTransferFrom(address, address, uint256) public pure override {
        revert("Soulbound");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Soulbound");
    }
}
