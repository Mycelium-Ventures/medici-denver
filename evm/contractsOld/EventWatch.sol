pragma solidity ^0.5.0;

contract EventWatch {
    //Creation Events
    event NewUser(address user, bytes32 userID);
    event SubscribeChannel(address indexed user, address indexed channel);
    event LikeVideo(address indexed user, address indexed channel, bytes32 indexed video);
    event NewChannel(address channel, bytes32 channelID);
}