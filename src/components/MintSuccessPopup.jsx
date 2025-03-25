import React, { useState } from 'react';

export default function MintSuccessPopup({ imageSrc, transactionHash, onClose }) {
  const [showImage, setShowImage] = useState(false);

  const downloadImage = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'NFT-Voucher.png';
    link.click();
  };

  const viewNFT = () => {
    setShowImage(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#0f0c29] p-6 rounded-2xl text-center max-w-lg w-full shadow-2xl border border-cyan-400">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">✅ Minting Successful!</h2>

        <p className="text-white text-sm mb-3">🎉 Your NFT Voucher is now in your wallet.</p>

        <p className="text-sm text-white font-mono break-words mb-6">
          <strong>Transaction:</strong>{' '}
          <a
            href={`https://sepolia.lineascan.build/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-300"
          >
            {transactionHash}
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={viewNFT}
            className="futuristic-btn bg-white text-black py-2 px-4 rounded-full hover:scale-105 transition-all"
          >
            🔗 View NFT
          </button>
          <button
            onClick={downloadImage}
            className="futuristic-btn bg-white text-black py-2 px-4 rounded-full hover:scale-105 transition-all"
          >
            📥 Download NFT
          </button>
        </div>

        {showImage && imageSrc && (
          <div className="mt-6">
            <img
              src={imageSrc}
              alt="NFT Voucher"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <p className="mt-4 text-white text-sm italic">
            🎉 Your NFT voucher is in your wallet!
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-sm text-white underline hover:text-yellow-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
