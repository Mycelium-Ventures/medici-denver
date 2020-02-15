pragma solidity ^0.5.0;
import "./ORM.sol";
import "./OracleExternal.sol";
contract ORMExternal is ORM, OracleExternal {
    function addSetClass(bytes32 _class) public onlyAuthorizedNode returns (bool) {
        return SetClasses.addKey(_class);
    }

    function add(bytes32 _class, bytes32 _data) public onlyAuthorizedNode returns (bool) {
        return _add(_class, _data);
    }

    function remove(bytes32 _class, bytes32 _data) public onlyAuthorizedNode returns (bool) {
        return _remove(_class, _data);
    }
    function containsKey(bytes32 _class) public view returns (bool) {
        return _containsKey(_class);
    }

    function getSetClassKeys() public view returns (bytes32[] memory) {
        return _getSetClassKeys();
    }

    function contains(bytes32 _class, bytes32 _data) public view returns (bool) {
        return _contains(_class, _data);
    }

    function enumerate(bytes32 _class) public view returns (bytes32[] memory) {
        return _enumerate(_class);
    }

    function length(bytes32 _class) public view returns (uint256) {
        return _length(_class);
    }

    function get(bytes32 _class, uint256 index) public view returns (bytes32) {
        return _get(_class, index);
    }

}