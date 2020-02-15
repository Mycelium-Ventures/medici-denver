pragma solidity ^0.5.0;

import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "./utils/EnumerableBytes32Set.sol";
import "./OracleExternal.sol";

contract ORM is OracleExternal {
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableBytes32Set for EnumerableBytes32Set.Bytes32Set;

    //Events
    event SubscribeChannel(address indexed user, address indexed channel);
    event LikeVideo(address indexed user, address indexed channel, bytes32 indexed video);

    //Sets
    EnumerableSet.AddressSet private users;
    EnumerableSet.AddressSet private channels;
    EnumerableBytes32Set.Bytes32Set private videos;

    //Base Metadata
    mapping(address => bytes32) public UserIDs;
    mapping(address => bytes32) public ChannelIDs;

    //Relationship Mapping
    mapping(address => EnumerableSet.AddressSet) private UserSubscriptions;
    mapping(address => EnumerableSet.AddressSet) private ChannelSubscribers;
    mapping(address => EnumerableBytes32Set.Bytes32Set) private ChannelVideos;
    mapping(bytes32 => EnumerableSet.AddressSet) private VideoLikes;
    mapping(bytes32 => address) private VideoChannel;

    //Users
    function addUsers(address[] calldata _users, bytes32[] calldata _userIDs) external onlyAuthorizedNode {
        require(_users.length == _userIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _users.length; i++) {
            _addUser(_users[i], _userIDs[i]);
        }
    }

    function _addUser(address _user, bytes32 _userID) internal {
        users.add(_user);
        UserIDs[_user] = _userID;
    }

    //Channels
    function addChannels(address[] calldata _channels, bytes32[] calldata _channelIDs) external onlyAuthorizedNode {
        require(_channels.length == _channelIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _channels.length; i++) {
            _addChannel(_channels[i], _channelIDs[i]);
        }
    }

    function _addChannel(address _channel, bytes32 _channelID) internal {
        channels.add(_channel);
        ChannelIDs[_channel] = _channelID;
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

        VideoLikes[_videoID].add(_user);
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