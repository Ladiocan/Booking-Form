import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import useUploadToPinata from './useUploadToPinata';
import useMintNFT from './useMintNFT';

export default function MintNFTModal({ formData, onClose }) {
  const canvasRef = useRef(null);
  const { uploadToPinata, isLoading: uploadLoading } = useUploadToPinata();
  const { mintNFT, loading: mintLoading } = useMintNFT();
  const [metadataURI, setMetadataURI] = useState(null);

  useEffect(() => {
    generateVoucher();
  }, []);

  const generateVoucher = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const bg = new Image();
    bg.src = '/voucher-template.png';

    bg.onload = async () => {
      ctx.drawImage(bg, 0, 0, 800, 600);
      ctx.font = '26px Orbitron, Arial';
      ctx.fillStyle = '#00FFFF';
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 12;
      ctx.textAlign = 'center';
      let y = 190;

      ctx.fillText(`Name: ${formData.touristName}`, 440, y);
      y += 25;
      ctx.fillText(`Destination: ${formData.destination}`, 440, y);
      y += 25;
      ctx.fillText(`Service: ${formData.serviceType}`, 440, y);
      y += 25;
      if (formData.serviceType === 'Hotel') {
        ctx.fillText(`Hotel: ${formData.hotelName} (${formData.hotelStars}★)`, 440, y);
        y += 25;
      }
      if (formData.serviceType === 'Flight') {
        ctx.fillText(`Flight: ${formData.flightCompany} #${formData.flightNumber}`, 440, y);
        y += 25;
      }
      if (formData.serviceType === 'Tour Package') {
        ctx.fillText(`Package: Hotel ${formData.packageHotel} + ${formData.packageFlight}`, 430, y);
        y += 25;
      }
      if (formData.serviceType === 'Rent a Car') {
        ctx.fillText(`Car Rental: ${formData.rentCompany} (${formData.carType})`, 430, y);
        y += 25;
      }
      if (formData.serviceType === 'Voucher') {
        ctx.fillText(`Voucher: ${formData.voucherService} (${formData.voucherType})`, 430, y);
        y += 25;
      }
      ctx.fillText(`Period: ${formData.startDate} - ${formData.endDate}`, 430, y);
      y += 25;
      ctx.fillText(`People: ${formData.adults} Adults / ${formData.children} Children`, 430, y);
      y += 25;
      ctx.fillText(`Price: ${formData.price} ${formData.currency}`, 430, y);
      if (formData.additionalInfo) {
        y += 25;
        ctx.fillText(`Note: ${formData.additionalInfo}`, 430, y);
      }

      ctx.shadowBlur = 0;
      const qrData = JSON.stringify(formData);
      const qr = await QRCode.toDataURL(qrData);
      const qrImg = new Image();
      qrImg.src = qr;
      qrImg.onload = () => {
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.drawImage(qrImg, 79, 425, 150, 150);
        ctx.shadowBlur = 0;
      };
    };
  };

  const handleUploadClick = async () => {
    try {
      const pinataRes = await uploadToPinata(canvasRef, formData);
      setMetadataURI(pinataRes.metadata);
      alert("✅ Uploaded to Pinata! Ready to mint.");
    } catch (err) {
      alert(`❌ Upload failed: ${err.message}`);
    }
  };

  const handleMintClick = async () => {
    if (!metadataURI) return alert("Please upload to Pinata first!");

    await mintNFT(metadataURI);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-black p-4 rounded-xl relative w-[850px]">
        <h3 className="text-xl font-semibold mb-4 text-white">NFT Voucher Preview</h3>
        <canvas ref={canvasRef} width={800} height={600} className="mb-4 rounded-lg shadow" />

        <button 
          onClick={handleUploadClick} 
          className="futuristic-btn w-full mb-2" 
          disabled={uploadLoading}
        >
          {uploadLoading ? 'Uploading...' : 'Upload to Pinata'}
        </button>

        <button 
          onClick={handleMintClick} 
          className="futuristic-btn w-full" 
          disabled={!metadataURI || mintLoading}
        >
          {mintLoading ? 'Minting NFT...' : 'Mint NFT (MetaMask)'}
        </button>

        <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>
      </div>
    </div>
  );
}