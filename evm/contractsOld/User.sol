pragma solidity ^0.5.0;

import "./Resource.sol";
import "./Channel.sol";

contract User is Resource {

    bytes32 public profilelId;

    function initialize(address _owner, bytes32 _profilelId) external initializer {
        Ownable.initialize(_owner);
        profilelId = _profilelId;
    }
}