// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title LoopOracle
/// @notice Manual validation module used to approve vault releases
contract LoopOracle is Ownable {
    mapping(address => bool) public approved;

    constructor() Ownable(msg.sender) {}

    /// @notice Mark a vault as approved for release
    function validate(address vault) external onlyOwner {
        approved[vault] = true;
    }
}
