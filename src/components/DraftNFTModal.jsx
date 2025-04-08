import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';

export default function DraftNFTModal({ formData, onClose, onContinueMint }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    generateDraft();
  }, []);

  const generateDraft = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const bg = new Image();
    bg.src = '/voucher-template.png';

    bg.onload = async () => {
      ctx.drawImage(bg, 0, 0, 800, 800);

      // Glow effect
      ctx.font = '26px Orbitron, Arial';
      ctx.fillStyle = '#00FFFF';
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 12;
      ctx.textAlign = 'center';
      let y = 260;

      ctx.fillText(`Name: ${formData.touristName}`, 440, y);
      y += 25;
      ctx.fillText(`Destination: ${formData.destination}`, 440, y);
      y += 25;
      ctx.fillText(`Service: ${formData.serviceType}`, 440, y);
      y += 25;
      if(formData.serviceType === 'Hotel') {
        ctx.fillText(`Hotel: ${formData.hotelName} (${formData.hotelStars}★)`, 440, y);
        y += 25;
      }
      if(formData.serviceType === 'Flight') {
        ctx.fillText(`Flight: ${formData.flightCompany} #${formData.flightNumber}`, 440, y);
        y += 25;
      }
      if(formData.serviceType === 'Tour Package') {
        ctx.fillText(`Package: Hotel ${formData.packageHotel} + ${formData.packageFlight}`, 430, y);
        y += 25;
      }
      if(formData.serviceType === 'Rent a Car') {
        ctx.fillText(`Car Rental: ${formData.rentCompany} (${formData.carType})`, 430, y);
        y += 25;
      }
      if(formData.serviceType === 'Voucher') {
        ctx.fillText(`Voucher: ${formData.voucherService} (${formData.voucherType})`, 430, y);
        y += 25;
      }
      ctx.fillText(`Period: ${formData.startDate} - ${formData.endDate}`, 430, y);
      y += 25;
      ctx.fillText(`People: ${formData.adults} Adults / ${formData.children} Children`, 430, y);
      y += 25;
      ctx.fillText(`Price: ${formData.price} ${formData.currency}`, 430, y);
      if(formData.additionalInfo) {
        y += 25;
        ctx.fillText(`Note: ${formData.additionalInfo}`, 430, y);
      }

      // QR Code
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
    

      // Watermark DRAFT
      ctx.save();
      ctx.translate(500, 440);
      ctx.rotate(-Math.atan(600 / 800));
      ctx.font = '250px Orbitron, Arial';
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.textAlign = 'center';
      ctx.fillText('DRAFT', 0, 0);
      ctx.restore();
      };
    };
  };

  const downloadPDF = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'px', [800, 800]);
    pdf.addImage(imgData, 'PNG', 0, 0, 800, 800);
    pdf.save('voucher-draft.pdf');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-black p-4 rounded-xl relative w-full max-w-[90vw] max-h-[90vh] flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-white">Draft NFT Voucher</h3>
        <div className="flex-1 overflow-auto flex items-center justify-center">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={800} 
            className="rounded-lg shadow"
            style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 180px)', objectFit: 'contain' }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={onContinueMint} className="futuristic-btn flex-1">Continue Mint</button>
          <button onClick={downloadPDF} className="futuristic-btn flex-1">Download PDF</button>
        </div>

        <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>
      </div>
    </div>
  );
}
