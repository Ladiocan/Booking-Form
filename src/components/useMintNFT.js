import { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import contractAbi from '../abi/VoucherNFT.json';

const contractAddress = "0xd8df6b5048463439136beea0ecc6968dcab736e2";

export default function useMintNFT() {
  const [loading, setLoading] = useState(false);

  const mintNFT = async (metadataURI) => {
    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("MetaMask not installed!");

      // Modificarea corectă pentru ethers.js v6
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      const tx = await contract.mintVoucher(metadataURI, {
        value: ethers.parseEther("0.001") // ajustat corect pentru v6
      });

      await tx.wait();

      alert(`✅ NFT Minted successfully! Tx hash: ${tx.hash}`);

      return tx;

    } catch (error) {
      console.error("Minting error:", error);
      alert(`❌ Minting failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { mintNFT, loading };
}
