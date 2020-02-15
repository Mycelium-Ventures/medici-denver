pragma solidity ^0.5.0;
import "./utils/EnumerableSet.sol";
import "./utils/EnumerableSetDictionary.sol";

//Read access free
//Write access internal
contract ORM {
    using EnumerableSet for EnumerableSet.Set;
    using EnumerableSetDictionary for EnumerableSetDictionary.SetDictionary;

    EnumerableSetDictionary.SetDictionary private Tables;

    function _addTable(bytes32 _table) internal returns (bool) {
        return Tables.addKey(_table);
    }

    function _getTable(bytes32 _table) internal view returns (EnumerableSet.Set storage) {
        return Tables.getValueForKey(_table);
    }

    function _containsKey(bytes32 _table) internal view returns (bool) {
        return Tables.containsKey(_table);
    }

    function _getTables() internal view returns (bytes32[] memory) {
        return Tables.enumerateKeys();
    }

    function _add(bytes32 _table, bytes32 _row) internal returns (bool) {
        return _getTable(_table).add(_row);
    }

    function _remove(bytes32 _table, bytes32 _row) internal returns (bool) {
        return _getTable(_table).remove(_row);
    }

    function _contains(bytes32 _table, bytes32 _row) internal view returns (bool) {
        return _getTable(_table).contains(_row);
    }

    function _enumerate(bytes32 _table) internal view returns (bytes32[] memory) {
        return _getTable(_table).enumerate();
    }

    function _length(bytes32 _table) internal view returns (uint256) {
        return _getTable(_table).length();
    }

    function _get(bytes32 _table, uint256 index) internal view returns (bytes32) {
        return _getTable(_table).get(index);
    }
}