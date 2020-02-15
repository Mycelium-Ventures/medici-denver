pragma solidity ^0.5.0;

import "./utils/EnumerableBytes32Set.sol";
import "./utils/EnumerableAddressSet.sol";

import "./OracleExternal.sol";

contract ORMChannel is OracleExternal {
    using EnumerableAddressSet for EnumerableAddressSet.AddressSet;
    using EnumerableBytes32Set for EnumerableBytes32Set.Bytes32Set;

    //Creation Events
    event NewChannel(address channel, bytes32 channelID);

    EnumerableAddressSet.AddressSet internal channels;
    mapping(address => bytes32) public ChannelIDs;

    //Channels
    function addChannel(address _channel, bytes32 _channelID) external onlyAuthorizedNode {
        _addChannel(_channel, _channelID);
    }
    function _addChannel(address _channel, bytes32 _channelID) internal {
        channels.add(_channel);
        ChannelIDs[_channel] = _channelID;

        emit NewChannel(_channel, _channelID);
    }

    function removeChannel(address _channel) external onlyAuthorizedNode returns (bool) {
        return channels.remove(_channel);
    }

    function containsChannel(address _channel) public view returns (bool) {
        return channels.contains(_channel);
    }

    function enumerateChannels() public view returns (address[] memory) {
        return channels.enumerate();
    }

    function lengthChannels() public view returns (uint256) {
        return channels.length();
    }

    function getChannel(uint256 index) public view returns (address)
    {
        return channels.get(index);
    }

    function addChannels(address[] calldata _channels, bytes32[] calldata _channelIDs) external onlyAuthorizedNode {
        require(_channels.length == _channelIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _channels.length; i++) {
            _addChannel(_channels[i], _channelIDs[i]);
        }
    }
}