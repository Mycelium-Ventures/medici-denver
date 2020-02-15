pragma solidity ^0.5.0;

import "./utils/EnumerableBytes32Set.sol";
import "./utils/EnumerableAddressSet.sol";

import "./OracleExternal.sol";

contract ORMUser is OracleExternal {
    using EnumerableAddressSet for EnumerableAddressSet.AddressSet;
    using EnumerableBytes32Set for EnumerableBytes32Set.Bytes32Set;
        //TODO contains/remove/enumerate/get

    //Creation Events
    event NewUser(address user, bytes32 userID);

    EnumerableAddressSet.AddressSet internal users;
    mapping(address => bytes32) public UserIDs;

    //Users
    function addUser(address _user, bytes32 _userID) external onlyAuthorizedNode {
        _addUser(_user, _userID);
    }

    function _addUser(address _user, bytes32 _userID) internal {
        users.add(_user);
        UserIDs[_user] = _userID;

        emit NewUser(_user, _userID);
    }

    function removeUser(address _user) external onlyAuthorizedNode returns (bool) {
        return users.remove(_user);
    }

    function containsUser(address _user) public view returns (bool) {
        return users.contains(_user);
    }

    function enumerateUsers() public view returns (address[] memory) {
        return users.enumerate();
    }

    function lengthUsers() public view returns (uint256) {
        return users.length();
    }

    function getUser(uint256 index) public view returns (address)
    {
        return users.get(index);
    }

    function addUsers(address[] calldata _users, bytes32[] calldata _userIDs) external onlyAuthorizedNode {
        require(_users.length == _userIDs.length, "Error arrays don't match");

        for (uint256 i = 0; i < _users.length; i++) {
            _addUser(_users[i], _userIDs[i]);
        }
    }
}