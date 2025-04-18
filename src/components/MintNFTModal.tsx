'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import useUploadToPinata from './useUploadToPinata';
import useMintNFT from './useMintNFT';
import MintSuccessPopup from './MintSuccessPopup';
import LoadingDots from './LoadingDots';
import { FormDataProps } from '../types/FormDataProps';

interface MintNFTModalProps {
  formData: FormDataProps;
  onClose: () => void;
}

export default function MintNFTModal({ formData, onClose }: MintNFTModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { uploadToPinata, isLoading: uploadLoading } = useUploadToPinata();
  const { mintNFT, loading: mintLoading } = useMintNFT();

  const [metadataURI, setMetadataURI] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [voucherImage, setVoucherImage] = useState<string | null>(null);

  useEffect(() => {
    const generateVoucher = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bg = new Image();
      bg.src = '/voucher-template.png';

      bg.onload = async () => {
        ctx.drawImage(bg, 0, 0, 800, 800);
        ctx.font = '26px Orbitron, Arial';
        ctx.fillStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 12;
        ctx.textAlign = 'center';
        let y = 260;

        ctx.fillText(`Name: ${formData.touristName}`, 440, y); y += 25;
        ctx.fillText(`Destination: ${formData.destination}`, 440, y); y += 25;
        ctx.fillText(`Service: ${formData.serviceType}`, 440, y); y += 25;

        if (formData.serviceType === 'Hotel') {
          ctx.fillText(`Hotel: ${formData.hotelName} (${formData.hotelStars}★)`, 440, y); y += 25;
        }
        if (formData.serviceType === 'Flight') {
          ctx.fillText(`Flight: ${formData.flightCompany} #${formData.flightNumber}`, 440, y); y += 25;
        }
        if (formData.serviceType === 'Tour Package') {
          ctx.fillText(`Package: Hotel ${formData.packageHotel} + ${formData.packageFlight}`, 430, y); y += 25;
        }
        if (formData.serviceType === 'Rent a Car') {
          ctx.fillText(`Car Rental: ${formData.rentCompany} (${formData.carType})`, 430, y); y += 25;
        }
        if (formData.serviceType === 'Voucher') {
          ctx.fillText(`Voucher: ${formData.voucherService} (${formData.voucherType})`, 430, y); y += 25;
        }

        ctx.fillText(`Period: ${formData.startDate} - ${formData.endDate}`, 430, y); y += 25;
        ctx.fillText(`People: ${formData.adults} Adults / ${formData.children} Children`, 430, y); y += 25;
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
          ctx.drawImage(qrImg, 79, 590, 150, 150);
          ctx.shadowBlur = 0;
        };
      };
    };

    generateVoucher();
  }, [formData]);

  const handleConfirmMint = async () => {
    try {
      let finalMetadataURI = metadataURI;

      if (!finalMetadataURI) {
        const pinataRes = await uploadToPinata(canvasRef, formData);
        setMetadataURI(pinataRes.metadata);
        finalMetadataURI = pinataRes.metadata;
      }

      const tx = await mintNFT(finalMetadataURI);
      setTransactionHash(tx.hash);

      const imageDataUrl = canvasRef.current?.toDataURL('image/png') || '';
      setVoucherImage(imageDataUrl);
      setShowSuccessPopup(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`❌ Minting failed: ${message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-black p-4 rounded-xl relative w-full max-w-[90vw] max-h-[90vh] flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-white">NFT Voucher Preview</h3>

        <div className="flex-1 overflow-auto flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="rounded-lg shadow"
            style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 180px)', objectFit: 'contain' }}
          />
        </div>

        <button
          onClick={handleConfirmMint}
          className="futuristic-btn w-full mt-4"
          disabled={uploadLoading || mintLoading}
        >
          {uploadLoading || mintLoading ? (
            <>
              Minting <LoadingDots />
            </>
          ) : (
            'Confirm Mint'
          )}
        </button>

        <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>

        {showSuccessPopup && (
          <MintSuccessPopup
            imageSrc={voucherImage || ''}
            transactionHash={transactionHash || ''}
            onClose={() => setShowSuccessPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
