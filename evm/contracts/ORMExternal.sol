pragma solidity ^0.5.0;
import "./ORM.sol";
import "./OracleExternal.sol";
contract ORMExternal is ORM, OracleExternal {
    event addTableEvent(bytes32 indexed _table);
    event addRowEvent(bytes32 indexed _table, bytes32 indexed _row);
    event removeRowEvent(bytes32 indexed _table, bytes32 indexed _row);

    function addTable(bytes32 _table) external onlyAuthorizedNode returns (bool) {

        bool added = _addTable(_table);
        if (added) {
            emit addTableEvent(_table); }

        return added;
    }

    function add(bytes32 _table, bytes32 _row) external onlyAuthorizedNode returns (bool) {

        bool added = _add(_table, _row);
        if (added) {
            emit addRowEvent(_table, _row); }

        return added;
    }

    function addBatch(bytes32[] calldata _table, bytes32[] calldata _row) external onlyAuthorizedNode returns (bool[] memory) {
        require(_table.length == _row.length, "Invalid entries!");

        bool[] memory added = new bool[](_table.length);
        for (uint256 i = 0; i < _table.length; i++) {
            added[i] = _add(_table[i], _row[i]);
            if (added[i]) {
                emit addRowEvent(_table[i], _row[i]); }
        }

        return added;
    }

    function remove(bytes32 _table, bytes32 _row) external onlyAuthorizedNode returns (bool) {

        bool removed = _remove(_table, _row);
        if (removed) {
            emit removeRowEvent(_table, _row); }

        return _remove(_table, _row);
    }

    function containsKey(bytes32 _table) public view returns (bool) {
        return _containsKey(_table);
    }

    function getTables() public view returns (bytes32[] memory) {
        return _getTables();
    }

    function contains(bytes32 _table, bytes32 _row) public view returns (bool) {
        return _contains(_table, _row);
    }

    function enumerate(bytes32 _table) public view returns (bytes32[] memory) {
        return _enumerate(_table);
    }

    function length(bytes32 _table) public view returns (uint256) {
        return _length(_table);
    }

    function get(bytes32 _table, uint256 index) public view returns (bytes32) {
        return _get(_table, index);
    }

}