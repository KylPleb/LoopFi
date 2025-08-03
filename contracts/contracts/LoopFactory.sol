// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LoopVault} from "./LoopVault.sol";
import {LoopRoleNFT} from "./LoopRoleNFT.sol";

contract LoopFactory {
    LoopRoleNFT public immutable roleNFT;
    address public immutable oracle;

    event LoopCreated(address indexed vault);

    constructor(address _roleNFT, address _oracle) {
        roleNFT = LoopRoleNFT(_roleNFT);
        oracle = _oracle;
    }

    function createLoop(
        address beneficiary,
        address[] calldata roleHolders,
        uint256[] calldata roleIds
    ) external returns (address) {
        require(roleHolders.length == roleIds.length, "Length mismatch");
        LoopVault vault = new LoopVault(beneficiary, oracle);
        for (uint256 i = 0; i < roleHolders.length; i++) {
            roleNFT.mintRole(roleHolders[i], roleIds[i]);
        }
        emit LoopCreated(address(vault));
        return address(vault);
    }
}
