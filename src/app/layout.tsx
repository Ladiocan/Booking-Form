'use client';

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import BlockchainBg from '@/components/BlockchainBg';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO Tags */}
        <title>Booking NFT Vouchers</title>
        <meta
          name="description"
          content="Free create and mint Web3-powered travel booking vouchers as NFTs. Integrate tourism with blockchain tech."
        />
        <meta
          name="keywords"
          content="NFT, Booking, Free, Travel, Web3, Blockchain, Pinata, MetaMask, Crypto, Voucher"
        />
        <meta name="author" content="Ladislau Ciocan" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Booking NFT Vouchers" />
        <meta
          property="og:description"
          content="Web3 travel bookings made real. Mint NFT vouchers for hotel, car rental or vacation packages."
        />
        <meta property="og:image" content="https://nftvoucher.ciocan.eu/preview-nftvoucher.png" />
        <meta property="og:url" content="https://nftvoucher.ciocan.eu" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/nft-voucher.ico" />
      </head>
      <body>
        <BlockchainBg />
        <WagmiConfig config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
