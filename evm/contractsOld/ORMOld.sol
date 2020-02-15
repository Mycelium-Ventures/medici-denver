pragma solidity ^0.5.0;

import "./utils/EnumerableBytes32Set.sol";
import "./utils/EnumerableAddressSet.sol";
import "./utils/EnumerableAddressSetMapping.sol";
import "./utils/EnumerableBytes32SetMapping.sol";

import "./OracleExternal.sol";
import "./ORMUser.sol";
import "./ORMChannel.sol";

contract ORM is OracleExternal, ORMUser, ORMChannel {
    using EnumerableAddressSet for EnumerableAddressSet.AddressSet;
    using EnumerableBytes32Set for EnumerableBytes32Set.Bytes32Set;
    using EnumerableAddressSetMapping for EnumerableAddressSetMapping.AddressSetMapping;
    using EnumerableBytes32SetMapping for EnumerableBytes32SetMapping.Bytes32SetMapping;

    //Creation Events
    //Interaction Events
    event SubscribeChannel(address indexed user, address indexed channel);
    event LikeVideo(address indexed user, address indexed channel, bytes32 indexed video);
    //Sets
    EnumerableBytes32Set.Bytes32Set private videos;
    //Relationship Mapping
    mapping(address => EnumerableAddressSet.AddressSet) private UserSubscriptions;
    mapping(address => EnumerableAddressSet.AddressSet) private ChannelSubscribers;
    mapping(address => EnumerableBytes32Set.Bytes32Set) private ChannelVideos;
    EnumerableAddressSetMapping.AddressSetMapping internal VideoLikes;
    mapping(bytes32 => address) internal VideoChannel;

    EnumerableAddressSet.AddressSet[] private AddressSetClasses;
    EnumerableBytes32Set.Bytes32Set[] private Bytes32SetClasses;
    EnumerableAddressSetMapping.AddressSetMapping[] private AddressSetMappingClasses;
    EnumerableBytes32SetMapping.Bytes32SetMapping[] private Bytes32SetMappingClasses;

    function addAddressSetClass() external onlyAuthorizedNode {
        AddressSetClasses.push(EnumerableAddressSet.AddressSet(new address[](0)));
    }

    function addBytes32SetClass() external onlyAuthorizedNode {
        Bytes32SetClasses.push(EnumerableBytes32Set.Bytes32Set(new bytes32[](0)));
    }

    function addAddressSetMappingClass() external onlyAuthorizedNode {
        AddressSetMappingClasses.push(EnumerableAddressSetMapping.AddressSetMapping());
    }

    function addBytes32SetMappingClass() external onlyAuthorizedNode {
        Bytes32SetMappingClasses.push(EnumerableBytes32SetMapping.Bytes32SetMapping());
    }

    //Videos
    function addVideos(address[] calldata _channels, bytes32[] calldata _videoIDs) external onlyAuthorizedNode {
        require(_channels.length == _videoIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _channels.length; i++) {
            _addVideo(_channels[i], _videoIDs[i]);
        }
    }

    function _addVideo(address _channel, bytes32 _videoID) internal {
        videos.add(_videoID);
        VideoChannel[_videoID] = _channel;
        ChannelVideos[_channel].add(_videoID);
    }

    //Subscriptions
    function subscribeToChannels(address[] calldata _users, address[] calldata _channels) external onlyAuthorizedNode {
        require(_users.length == _channels.length, "Error arrays don't match");

        for (uint256 i = 0; i < _users.length; i++) {
            _subscribeToChannel(_users[i], _channels[i]);
        }
    }

    function _subscribeToChannel(address _user, address _channel) internal {
        UserSubscriptions[_user].add(_channel);
        ChannelSubscribers[_channel].add(_user);
        emit SubscribeChannel(_user, _channel);
    }

    //Likes
    function likeVideos(address[] calldata _users, bytes32[] calldata _videoIDs) external onlyAuthorizedNode {
        require(_users.length == _videoIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _users.length; i++) {
            _likeVideo(_users[i], _videoIDs[i]);
        }
    }

    function _likeVideo(address _user, bytes32 _videoID) internal {
        address channel = VideoChannel[_videoID];
        require(channel != address(0), "Video does not have channel.");

        VideoLikes.addForKey(_videoID, _user);
        emit LikeVideo(_user, channel, _videoID);
    }


    // Modifiers
    modifier onlyUser() {
        require(users.contains(msg.sender) || msg.sender == owner(), "Not an authorized user to fulfill requests");
    _;
    }

    modifier onlyChannel() {
        require(channels.contains(msg.sender) || msg.sender == owner(), "Not an authorized channel to fulfill requests");
    _;
    }
}