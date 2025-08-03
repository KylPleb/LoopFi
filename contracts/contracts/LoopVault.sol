// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {LoopOracle} from "./LoopOracle.sol";

/// @title LoopVault
/// @notice Holds funds and releases them once validated by the oracle
contract LoopVault {
    address public immutable token; // address(0) for ETH
    address public immutable beneficiary;
    LoopOracle public immutable oracle;
    bool public released;

    constructor(address _token, address _beneficiary, address _oracle) {
        token = _token;
        beneficiary = _beneficiary;
        oracle = LoopOracle(_oracle);
    }

    /// @notice Deposit funds into the vault
    /// @param amount Amount of ERC20 tokens to deposit (ignored for ETH)
    function deposit(uint256 amount) external payable {
        if (token == address(0)) {
            require(msg.value > 0, "No ETH sent");
        } else {
            require(msg.value == 0, "ETH not accepted");
            IERC20(token).transferFrom(msg.sender, address(this), amount);
        }
    }

    /// @notice Release funds to the beneficiary if approved by the oracle
    function release() external {
        require(!released, "Already released");
        require(oracle.approved(address(this)), "Not approved");
        released = true;
        if (token == address(0)) {
            (bool ok, ) = beneficiary.call{value: address(this).balance}("");
            require(ok, "ETH transfer failed");
        } else {
            IERC20 erc20 = IERC20(token);
            erc20.transfer(beneficiary, erc20.balanceOf(address(this)));
        }
    }
}
