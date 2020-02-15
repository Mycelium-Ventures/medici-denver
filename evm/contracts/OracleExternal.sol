pragma solidity ^0.5.0;

// Constructor for Upgradeable Contract due to Proxy architecture
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

/**
 * @title The Chainlink Oracle contract (OZ Upgradeable version)
 * @notice Node operators can deploy this contract to fulfill requests sent to them
 * @dev Upgradeable version of Oracle contract. Uses OpenZeppelin's Initializable, Ownable contracts.
 *      Other Chainlink interfaces are unchanged.
 */
contract OracleExternal is Initializable, Ownable {
  using SafeMath for uint256;

  mapping(address => bool) public authorizedNodes;

  /**
   * @notice Called by the Chainlink node to fulfill requests
   * @dev Given params must hash back to the commitment stored from `oracleRequest`.
   * Will call the callback address' callback function without bubbling up error
   * checking in a `require` so that the node can get paid.
   * @param _callbackAddress The callback address to call for fulfillment
   * @param _callbackFunctionId The callback function ID to use for fulfillment
   * @param _data The data to return to the consuming contract
   * @return Status if the external call was successful
   */
    //0xa99fea5f
  function fulfillExternalRequest(
    address _callbackAddress,
    bytes4 _callbackFunctionId,
    bytes calldata _data
  )
    external
    onlyAuthorizedNode
    returns (bool)
  {
    // All updates to the oracle's fulfillment should come before calling the
    // callback(addr+functionId) as it is untrusted.
    // See: https://solidity.readthedocs.io/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern
    // Replace with encodeWithSelector to avoid padding
    (bool success,) = _callbackAddress.call(abi.encodeWithSelector(_callbackFunctionId, _data));
    return success;
  }

  /**
   * @notice Use this to check if a node is authorized for fulfilling requests
   * @param _node The address of the Chainlink node
   * @return The authorization status of the node
   */
  function getAuthorizationStatus(address _node) external view returns (bool) {
    return authorizedNodes[_node];
  }

  /**
   * @notice Sets the fulfillment permission for a given node. Use `true` to allow, `false` to disallow.
   * @param _node The address of the Chainlink node
   * @param _allowed Bool value to determine if the node can fulfill requests
   */
  function setFulfillmentPermission(address _node, bool _allowed) external onlyOwner {
    authorizedNodes[_node] = _allowed;
  }

  /**
   * @dev Reverts if `msg.sender` is not authorized to fulfill requests
   */
  modifier onlyAuthorizedNode() {
    require(authorizedNodes[msg.sender] || msg.sender == owner(), "Not an authorized node to fulfill requests");
    _;
  }

  // Reserved storage space to allow for layout changes in the future.
  uint256[50] private ______gap;

}