// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArbitraryStaticCall {
    function arbitraryStaticCall(
        address target,
        bytes calldata data
    ) external view returns (bytes memory result) {
        // Perform a staticcall to the target with the provided data
        (bool success, bytes memory returnData) = target.staticcall(data);
        require(success, "Static call failed");
        return returnData;
    }
}
