pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract OracleExternalConsumer is Ownable {

    mapping(address => bool) public authorizedOracles;

   /**
   * @notice Use this to check if a oracle contract is authorized for fulfilling requests
   * @param _oracle The address of the oracle contract
   * @return The authorization status of the oracle contract
   */
  function getAuthorizationStatus(address _oracle) external view returns (bool) {
    return authorizedOracles[_oracle];
  }

  /**
   * @notice Sets the fulfillment permission for a given node. Use `true` to allow, `false` to disallow.
   * @param _oracle The address of the Chainlink node
   * @param _allowed Bool value to determine if the node can fulfill requests
   */
  function setFulfillmentPermission(address _oracle, bool _allowed) external onlyOwner {
    authorizedOracles[_oracle] = _allowed;
  }

  /**
   * @dev Reverts if `msg.sender` is not authorized to fulfill requests
   */
  modifier onlyAuthorizedOracle() {
    require(authorizedOracles[msg.sender] || msg.sender == owner(), "Not an authorized node to fulfill requests");
    _;
  }
}