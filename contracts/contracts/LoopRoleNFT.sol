// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title LoopRoleNFT
/// @notice Soulbound NFT used to assign roles in LoopFi
contract LoopRoleNFT is ERC721, Ownable {
    uint256 public nextId;
    mapping(uint256 => string) public roles;
    mapping(address => bool) public hasRole;

    constructor() ERC721("LoopRoleNFT", "LRN") Ownable(msg.sender) {}

    /// @notice Mint a role NFT to `to`
    /// @param to Address receiving the role
    /// @param role String identifier of the role
    function mintRole(address to, string memory role) external onlyOwner returns (uint256) {
        require(!hasRole[to], "Role already assigned");
        uint256 tokenId = ++nextId;
        _safeMint(to, tokenId);
        roles[tokenId] = role;
        hasRole[to] = true;
        return tokenId;
    }

    /// @dev Soulbound: disable approvals
    function approve(address, uint256) public pure override {
        revert("Soulbound");
    }

    /// @dev Soulbound: disable approvals
    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound");
    }

    /// @dev Soulbound: only allow minting or burning
    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(from == address(0) || to == address(0), "Soulbound");
        super._transfer(from, to, tokenId);
    }
}
