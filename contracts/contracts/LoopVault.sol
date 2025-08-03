// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ILoopOracle {
    function isValidated(address vault) external view returns (bool);
}

contract LoopVault {
    address public immutable beneficiary;
    ILoopOracle public immutable oracle;

    constructor(address _beneficiary, address _oracle) payable {
        beneficiary = _beneficiary;
        oracle = ILoopOracle(_oracle);
    }

    receive() external payable {}

    function release() external {
        require(oracle.isValidated(address(this)), "Not validated");
        uint256 bal = address(this).balance;
        require(bal > 0, "No funds");
        (bool ok, ) = beneficiary.call{value: bal}("");
        require(ok, "Transfer failed");
    }
}
