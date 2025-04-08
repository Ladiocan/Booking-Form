'use client';

import { useAccount } from 'wagmi';
import BookingFormComponent from '@/components/BookingFormComponent';
import ConnectButton from '@/components/ConnectButton';
import '../styles/globals.css';

export default function BookingFormPage() {
  const { isConnected, address } = useAccount();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative md:px-8 lg:px-12 xl:px-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold glow-text md:text-6xl lg:text-7xl xl:text-8xl">Booking NFT Voucher Creator</h1>
        <p className="mt-2 text-lg text-gray-300 md:text-xl lg:text-2xl xl:text-3xl">Create blockchain-secured NFT vouchers for travel & tourism</p>
      </header>

      <div className="glass-card w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center space-y-6">
        {!isConnected ? (
          <>
            <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl">Connect to Create</h2>
            <ConnectButton />
          </>
        ) : (
          <>
            <p className="text-sm text-center md:text-base lg:text-lg xl:text-xl">Wallet: {address}</p>
            <ConnectButton /> {/* Doar aici o singură dată */}
            <BookingFormComponent /> {/* Doar formularul */}
          </>
        )}
      </div>
    </div>
  );
}
