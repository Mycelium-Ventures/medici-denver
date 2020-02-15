pragma solidity ^0.5.0;

import "./Resource.sol";

contract ResourceFactory is OracleExternalConsumer {
    address[] public resources;

    function createResource(bytes calldata _data) external onlyAuthorizedOracle returns (address) {
        Resource r = new Resource();
        r.initialize(_data);
        resources.push(address(r));
        return address(r);
    }

}