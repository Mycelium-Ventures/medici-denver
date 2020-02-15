pragma solidity ^0.5.0;
import "./utils/EnumerableSet.sol";
import "./utils/EnumerableSetDictionary.sol";

//Read access free
//Write access internal
contract ORM {
    using EnumerableSet for EnumerableSet.Set;
    using EnumerableSetDictionary for EnumerableSetDictionary.SetDictionary;

    EnumerableSetDictionary.SetDictionary internal SetClasses;

    function _addSetClass(bytes32 _class) internal returns (bool) {
        return SetClasses.addKey(_class);
    }

    function _getSetClass(bytes32 _class) internal view returns (EnumerableSet.Set storage) {
        return SetClasses.getValueForKey(_class);
    }

    function _containsKey(bytes32 _class) internal view returns (bool) {
        return SetClasses.containsKey(_class);
    }

    function _getSetClassKeys() internal view returns (bytes32[] memory) {
        return SetClasses.enumerateKeys();
    }

    function _add(bytes32 _class, bytes32 _data) internal returns (bool) {
        return _getSetClass(_class).add(_data);
    }

    function _remove(bytes32 _class, bytes32 _data) internal returns (bool) {
        return _getSetClass(_class).remove(_data);
    }

    function _contains(bytes32 _class, bytes32 _data) internal view returns (bool) {
        return _getSetClass(_class).contains(_data);
    }

    function _enumerate(bytes32 _class) internal view returns (bytes32[] memory) {
        return _getSetClass(_class).enumerate();
    }

    function _length(bytes32 _class) internal view returns (uint256) {
        return _getSetClass(_class).length();
    }

    function _get(bytes32 _class, uint256 index) internal view returns (bytes32) {
        return _getSetClass(_class).get(index);
    }
}