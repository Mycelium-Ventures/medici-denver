pragma solidity ^0.5.0;

import "./TIPS.sol"

//Treasury Inflation-Protected Security
contract TIPSTreasury {
    event TreasuryClaim(uint256 indexed tokenId, uint256 amount);

    address public parent
    uint256 public authorizedPerShare;
    uint256 public totalClaimable;
    uint256 public totalClaimed;
    mapping (uint256 => uint256) claimed;
    
    /**
   * @notice Mints preferred stock.
   * @dev Preferred stock has a claim on future inflation.
   * @param account Address to mint to
   * @param amount Amount of ERC-721 tokens to mint
   */
    function claimById(uint256[] calldata tokenIds) external returns (bool) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            _claimById(tokenId);
        }

        return true;
    }

    function _claimById(uint256 tokenId) internal returns (bool) {
        address sender = _msgSender();
        address tokenOwner = preferredStock.ownerOf(tokenId);
        require(sender == tokenOwner, "Sender does not own preferred share.");
        require(authorizedPerShare > claimed[tokenId], "Tokens already claimed.");

        uint256 authorizedAmount = authorizedPerShare.sub(claimed[tokenId]);
        //Update claimed amount
        claimed[tokenId] = claimed[tokenId].add(authorizedAmount);
        totalClaimed = totalClaimed.add(authorizedAmount);

        emit PreferredStockClaim(tokenId, authorizedAmount);
        //Transfer claimed tokens
        _transfer(address(this), sender, authorizedAmount);

        return true;
    }

}