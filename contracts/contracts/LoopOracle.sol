// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LoopOracle is Ownable {
    mapping(address => bool) private _validated;

    event Validated(address indexed vault);

    function isValidated(address vault) external view returns (bool) {
        return _validated[vault];
    }

    function validate(address vault) external onlyOwner {
        _validated[vault] = true;
        emit Validated(vault);
    }
}
