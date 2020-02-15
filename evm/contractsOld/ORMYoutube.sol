pragma solidity ^0.5.0;

import "./utils/EnumerableSet.sol";
import "./utils/EnumerableSetMapping.sol";
import "./utils/EnumerableSetDictionary.sol";

import "./ORMExternal.sol";
contract ORMExternal is {
    using EnumerableSet for EnumerableSet.Set;
    using EnumerableSetMapping for EnumerableSetMapping.SetMapping;
    using EnumerableSetDictionary for EnumerableSetDictionary.SetDictionary;

    //Events
    event SubscribeChannel(address indexed user, address indexed channel);
    event LikeVideo(address indexed user, address indexed channel, bytes32 indexed video);

    //Tables
    constant user = keccak256("user");
    constant channel = keccak256("channel");
    constant video = keccak256("video");
    constant video = keccak256("user.key.channel");
    constant video = keccak256("video");
    constant video = keccak256("video");
    constant video = keccak256("video");


    //Sets
    //Relationship Mapping
    //Top-level
    /*
    user
    channel
    video
    */
    //Second-level
    /*
    user.key.channel
    channel.key.user
    channel.key.video
    video.key.likes
    video.key.channel
    */
    //Videos
    function _addVideo(address _channel, bytes32 _videoID) internal {
        videos.add(_videoID);
        VideoChannel[_videoID] = _channel;
        ChannelVideos[_channel].add(_videoID);
    }

    function _subscribeToChannel(address _user, address _channel) internal {
        UserSubscriptions[_user].add(_channel);
        ChannelSubscribers[_channel].add(_user);
        emit SubscribeChannel(_user, _channel);
    }

    function _likeVideo(address _user, bytes32 _videoID) internal {
        address channel = VideoChannel[_videoID];
        require(channel != address(0), "Video does not have channel.");

        VideoLikes.addForKey(_videoID, _user);
        emit LikeVideo(_user, channel, _videoID);
    }
}