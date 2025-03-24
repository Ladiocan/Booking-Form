import React from 'react';
import useMintNFT from './useMintNFT';

export default function ConfirmMintButton({ canvasRef, formData }) {
  const { uploadAndMint, loading } = useMintNFT();

  return (
    <button 
      onClick={() => uploadAndMint(canvasRef, formData)} 
      className="futuristic-btn w-full" 
      disabled={loading}
    >
      {loading ? 'Minting...' : 'Confirm Mint'}
    </button>
  );
}
