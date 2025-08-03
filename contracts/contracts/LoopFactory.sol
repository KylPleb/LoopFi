// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LoopVault} from "./LoopVault.sol";
import {LoopRoleNFT} from "./LoopRoleNFT.sol";
import {LoopOracle} from "./LoopOracle.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title LoopFactory
/// @notice Deploys LoopVaults and assigns roles
contract LoopFactory is Ownable {
    LoopRoleNFT public immutable roleNFT;
    LoopOracle public immutable oracle;

    constructor(address _roleNFT, address _oracle) Ownable(msg.sender) {
        roleNFT = LoopRoleNFT(_roleNFT);
        oracle = LoopOracle(_oracle);
    }

    /// @notice Deploy a new LoopVault
    /// @param token Address of ERC20 token or zero for ETH
    /// @param beneficiary Address receiving released funds
    function createLoop(address token, address beneficiary) external onlyOwner returns (address) {
        LoopVault vault = new LoopVault(token, beneficiary, address(oracle));
        roleNFT.mintRole(beneficiary, "beneficiary");
        return address(vault);
    }
}
