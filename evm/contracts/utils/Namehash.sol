pragma solidity ^0.5.0;

// Tail-recursive Namehash
library Namehash {
    function namehash(bytes32[] memory labels)
        internal
        pure
        returns (bytes32)
    {
        bytes32 currHash = 0x0000000000000000000000000000000000000000000000000000000000000000;

        if (labels.length == 0) {
            return currHash;
        }

        for (uint256 i = labels.length - 1; i >= 0; i--) {
            currHash = keccak256(abi.encodePacked(currHash, labels[i]));
        }

        return currHash;
    }
}