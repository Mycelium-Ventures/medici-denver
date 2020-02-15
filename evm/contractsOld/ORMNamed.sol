pragma solidity ^0.5.0;

import "./ORM.sol";

contract ORMNamed is OracleExternal, ORM {
    mapping(bytes32 => uint256) AddressSetClassNames;

    function _addAddressSetClass(bytes32 _name) internal {
        AddressSetClassNames[_name] = _addAddressSetClass() - 1;
    }

    function _getAddressSetClass(bytes32 _name) internal view returns (EnumerableAddressSet.AddressSet storage) {
        return _getAddressSetClass(classes[_name]);
    }

    function _addBytes32SetClass(bytes32 _name) internal {
        Bytes32SetClassNames[_name] = _addBytes32SetClass() - 1;
    }

    function _getBytes32SetClass(bytes32 _name) internal view returns (EnumerableBytes32Set.Bytes32Set storage) {
        return _getBytes32SetClass(classes[_name]);
    }

    function addAddressSetMappingClass() external onlyAuthorizedNode {
        AddressSetMappingClasses.push(EnumerableAddressSetMapping.AddressSetMapping());
    }

    function addBytes32SetMappingClass() external onlyAuthorizedNode {
        Bytes32SetMappingClasses.push(EnumerableBytes32SetMapping.Bytes32SetMapping());
    }
}