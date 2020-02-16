pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract CreatorContract is Ownable {

    function initialize() initializer {
        Ownable.initialize(msg.data
    }

}