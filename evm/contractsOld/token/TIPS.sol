pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Enumerable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Burnable.sol";

//Treasury Inflation-Protected Security
contract TIPS is ERC721, ERC721Enumerable, ERC721Mintable, ERC721Burnable {
    function initialize(address sender) public initializer {
        ERC721.initialize();
        ERC721Enumerable.initialize();
        ERC721Mintable.initialize(sender);
    }

    function burn(uint256 tokenId) public onlyMinter {
        _burn(tokenId);
    }

    function totalSupply() internal view returns (uint256) {
        return preferredStock.totalSupply();
    }

    function mintTIPS(address account, uint256 amount) public onlyMinter returns (bool) {
        uint256 preferredStockEndId = preferredStockMaxId.add(amount);
        for (uint256 tokenId = preferredStockMaxId; tokenId < preferredStockEndId; tokenId++) {
            preferredStock.mint(account, tokenId);
            claimed[tokenId] = authorizedPerShare; //Only right to future inflation.
        }

        // Update min id for future minting
        preferredStockMaxId = preferredStockEndId;

        return true;
    }

    function burnTIPS(uint256[] calldata tokenIds) external returns (bool) {
        return _burnTIPS(tokenIds);
    }
    function _burnTIPS(uint256[] memory tokenIds) internal returns (bool) {
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

}