pragma solidity ^0.5.0;

import "./ResourceFactory.sol";
import "./User.sol";

contract UserFactory is ResourceFactory {
    address[] public users;

    function createResource(address _owner, bytes32 _profilelId) external onlyAuthorizedOracle returns (address) {
        User r = new User();
        users.push(_owner);

        r.initialize(_owner, _profilelId);
        return address(r);
    }

}