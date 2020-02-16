pragma solidity ^0.5.0;

//Treasury Inflation-Protected Security
contract TIPSTreasury {
    event TreasuryClaim(uint256 indexed tokenId, uint256 amount);

    uint public parent
    uint256 public authorizedPerShare;
    uint256 public totalClaimable;
    uint256 public totalClaimed;


    mapping (uint256 => uint256) claimed;

    function preferredStockSupply() public view returns (uint256) {
        return _preferredStockSupply();
    }

    function preferredStockAddress() public view returns (address) {
        return address(preferredStock);
    }

    function _preferredStockSupply() internal view returns (uint256) {
        return preferredStock.totalSupply();
    }

    /**
     * @dev Overrieds the standard ERC20Mintable mint function. See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint(address account, uint256 amount) public onlyMinter returns (bool) {
        // No prefferred stock
        uint256 preferredSupply = _preferredStockSupply();
        if (preferredSupply == 0) {
            _mint(account, amount);
            return true;
        }

        uint256 mintPerShare = amount.div(commonStockSupply);
        // Reverse operation to avoid rounding errors and the creation of dust
        uint256 mintCommon = mintPerShare.mul(commonStockSupply);

        // Mint common stock tokens
        _mint(account, mintCommon);
        // Increase authorized claim per share
        authorizedPerShare = authorizedPerShare.add(mintPerShare);
        // Mint preferred stock tokens
        uint256 mintPreffered = mintPerShare.mul(preferredSupply);
        // Tokens are held on the contracts balance
        // Loss of the ERC721 token holder will permanently lock that claim
        _mint(address(this), mintPreffered);
        totalClaimable = totalClaimable.add(mintPreffered);

        return true;
    }

    /**
   * @notice Mints preferred stock.
   * @dev Preferred stock has a claim on future inflation.
   * @param account Address to mint to
   * @param amount Amount of ERC-721 tokens to mint
   */
    function mintPrefferedStock(address account, uint256 amount) public onlyMinter returns (bool) {
        uint256 preferredStockEndId = preferredStockMaxId.add(amount);
        for (uint256 tokenId = preferredStockMaxId; tokenId < preferredStockEndId; tokenId++) {
            preferredStock.mint(account, tokenId);
            claimed[tokenId] = authorizedPerShare; //Only right to future inflation.
        }

        // Update min id for future minting
        preferredStockMaxId = preferredStockEndId;

        return true;
    }

    function burnPrefferedStock(uint256[] calldata tokenIds) external returns (bool) {
        return _burnPrefferedStock(tokenIds);
    }
    function _burnPrefferedStock(uint256[] memory tokenIds) internal returns (bool) {
        address sender = _msgSender();
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            address tokenOwner = preferredStock.ownerOf(tokenId);
            require(sender == tokenOwner, "Sender does not own preferred share.");
            require(claimed[tokenId] == authorizedPerShare, "Must claim all tokens before burn");

            delete(claimed[tokenId]); // No longer needed to keep track of claim
            // deleting ERC721 token reduces its supply, does not impact max token id
            preferredStock.burn(tokenId);
        }

        return true;
    }

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