'use client';

import { useAccount } from 'wagmi';
import BookingFormComponent from '@/components/BookingFormComponent';
import ConnectButton from '@/components/ConnectButton';
import '../styles/globals.css';

export default function BookingFormPage() {
  const { isConnected, address } = useAccount();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold glow-text">Booking NFT Voucher Creator</h1>
        <p className="mt-2 text-lg text-gray-300">Create blockchain-secured NFT vouchers for travel & tourism</p>
      </header>

      <div className="glass-card w-full max-w-xl flex flex-col items-center space-y-6">
        {!isConnected ? (
          <>
            <h2 className="text-xl font-semibold">Connect to Create</h2>
            <ConnectButton />
          </>
        ) : (
          <>
            <p className="text-sm text-center">Wallet: {address}</p>
            <ConnectButton /> {/* Doar aici o singură dată */}
            <BookingFormComponent /> {/* Doar formularul */}
          </>
        )}
      </div>
    </div>
  );
}
