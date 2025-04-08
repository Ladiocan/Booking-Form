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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#0f0c29] p-6 rounded-2xl text-center w-full max-w-[90vw] max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">✅ Minting Successful!</h2>

        <div className="flex-1 overflow-auto">
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

          {showImage && imageSrc && (
            <div className="mt-4 flex justify-center">
              <img
                src={imageSrc}
                alt="NFT Voucher"
                className="rounded-xl shadow-lg"
                style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 300px)', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <button
            onClick={viewNFT}
            className="futuristic-btn bg-white text-black py-2 px-4 rounded-full hover:scale-105 transition-all flex-1"
          >
            🔗 View NFT
          </button>
          <button
            onClick={downloadImage}
            className="futuristic-btn bg-white text-black py-2 px-4 rounded-full hover:scale-105 transition-all flex-1"
          >
            📥 Download NFT
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-white underline hover:text-yellow-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
