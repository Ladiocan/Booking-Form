// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract VoucherNFT is ERC721URIStorage, ReentrancyGuard {
    uint256 public nextTokenId = 1;
    uint256 public mintPrice = 0.001 ether;
    address public owner;

    constructor() ERC721("VoucherNFT", "VCHR") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function mintVoucher(string memory _tokenURI) external payable nonReentrant {
        require(msg.value == mintPrice, "Need to send 0.001 ETH");
        require(bytes(_tokenURI).length > 10, "Invalid tokenURI");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function withdraw() external onlyOwner nonReentrant {
        payable(owner).transfer(address(this).balance);
    }
}
