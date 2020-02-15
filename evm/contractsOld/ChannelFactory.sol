pragma solidity ^0.5.0;

import "./ResourceFactory.sol";
import "./Channel.sol";

contract ChannelFactory is ResourceFactory {
    function createResource(address _owner, bytes32 _channelId)
        public
        onlyAuthorizedOracle
        returns (address)
    {
        Channel r = new Channel();
        r.initialize(_owner, _channelId);
        return address(r);
    }
}
