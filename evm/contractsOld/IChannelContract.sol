pragma solidity ^0.5.0;

interface IChannelContract {

    struct Media {
        uint id;
        uint timestamp;
        uint likes;
        uint comments;
    }

    event UserAction (uint indexed actionId, uint indexed user, uint media);

    //Info
    function name() external returns (string memory);
    function uri() external returns (string memory);
    //Finances
    function balance() external returns (string memory);
    
    function perMediaBudget() external returns (string memory);
    function uriForMedia() external returns (string memory);

    function userAction(uint _actionId, bytes calldata _data) external returns (bool);
    function selectorForAction(uint _actionId) external returns (bytes4);

    // 0
    function subscribe() external returns (bool);
    // 1
    function like(uint _media) external returns (bool);
    // 2
    function comment() external returns (bool);



}