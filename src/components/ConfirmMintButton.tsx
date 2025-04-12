'use client';

import React from 'react';
import useUploadToPinata from './useUploadToPinata';
import useMintNFT from './useMintNFT';
import LoadingDots from './LoadingDots';
import { FormDataProps } from '../types/FormDataProps';

interface ConfirmMintButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  formData: FormDataProps;
}

export default function ConfirmMintButton({ canvasRef, formData }: ConfirmMintButtonProps) {
  const { uploadToPinata, isLoading: uploadLoading } = useUploadToPinata();
  const { mintNFT, loading: mintLoading } = useMintNFT();

  const handleClick = async () => {
    try {
      if (!canvasRef.current) throw new Error('Canvas not available');
      const pinataRes = await uploadToPinata(canvasRef, formData);
      const metadataURI = pinataRes.metadata;

      await mintNFT(metadataURI);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`❌ Failed: ${message}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="futuristic-btn w-full"
      disabled={uploadLoading || mintLoading}
    >
      {uploadLoading || mintLoading ? (
        <>
          Minting<LoadingDots />
        </>
      ) : (
        'Confirm Mint'
      )}
    </button>
  );
}
