pragma solidity ^0.5.0;

import "./Resource.sol";
contract Channel is Resource {

    bytes32 public channelId;

    function initialize(address _owner, bytes32 _channelId) external initializer {
        Ownable.initialize(_owner);
        channelId = _channelId;
    }
}