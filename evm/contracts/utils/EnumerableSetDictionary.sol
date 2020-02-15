pragma solidity ^0.5.0;

import "./EnumerableSet.sol";

library EnumerableSetDictionary {
    using EnumerableSet for EnumerableSet.Set;

    struct SetDictionary {
        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the setDictionary.
        mapping(bytes32 => EnumerableSet.Set) data;
        EnumerableSet.Set keys;
    }

    /**
     * @dev Add a value to a setDictionary. O(1).
     * Returns false if the value was already in the setDictionary.
     */
    function addKey(SetDictionary storage setDictionary, bytes32 key)
        internal
        returns (bool)
    {
        return setDictionary.keys.add(key);
    }

    function containsKey(SetDictionary storage setDictionary, bytes32 key)
        internal
        view
        returns (bool)
    {
        return setDictionary.keys.contains(key);
    }

    /**
     * @dev Returns the number of elements on the setDictionary. O(1).
     */
    function length(SetDictionary storage setDictionary)
        internal
        view
        returns (uint256)
    {
        return setDictionary.keys.length();
    }

    /**
     * @dev Returns an array with all values in the setDictionary. O(N).
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.

     * WARNING: This function may run out of gas on large setDictionarys: use {length} and
     * {get} instead in these cases.
     */
    function enumerateKeys(SetDictionary storage setDictionary)
        internal
        view
        returns (bytes32[] memory)
    {
        return setDictionary.keys.enumerate();
    }

    function getKeyAtIndex(SetDictionary storage setDictionary, uint256 index)
        internal
        view
        returns (bytes32)
    {
        return setDictionary.keys.get(index);
    }

    /**
     * @dev Add a value to a setDictionary. O(1).
     * Returns false if the value was already in the setDictionary.
     */
    function addValueForKey(SetDictionary storage setDictionary, bytes32 key, bytes32 value)
        internal
        returns (bool)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key].add(value);
    }

    /**
     * @dev Removes a value from a setDictionary. O(1).
     * Returns false if the value was not present in the setDictionary.
     */
    function removeValueForKey(SetDictionary storage setDictionary, bytes32 key, bytes32 value)
        internal
        returns (bool)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");
        
        return setDictionary.keys.remove(key) && setDictionary.data[key].remove(value);
    }

    /**
     * @dev Returns true if the value is in the setDictionary. O(1).
     */
    function containsValueForKey(SetDictionary storage setDictionary, bytes32 key, bytes32 value)
        internal
        view
        returns (bool)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key].contains(value);
    }

    function getValueForKey(SetDictionary storage setDictionary, bytes32 key)
        internal
        view
        returns (EnumerableSet.Set storage)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key];
    }

    

    function enumerateForKey(SetDictionary storage setDictionary, bytes32 key)
        internal
        view
        returns (bytes32[] memory)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key].enumerate();
    }

    

    /**
     * @dev Returns the number of elements on the setDictionary. O(1).
     */
    function lengthForKey(SetDictionary storage setDictionary, bytes32 key)
        internal
        view
        returns (uint256)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key].length();
    }

   /** @dev Returns the element stored at position `index` in the setDictionary. O(1).
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function getValueAtIndexForKey(SetDictionary storage setDictionary, bytes32 key, uint256 index)
        internal
        view
        returns (bytes32)
    {
        require(containsKey(setDictionary, key), "Error key does not exist!");

        return setDictionary.data[key].get(index);
    }

}
