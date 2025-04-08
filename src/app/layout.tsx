'use client';

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'; 
import BlockchainBg from '@/components/BlockchainBg'; 

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* ANIMATION BACKGROUND */}
        <BlockchainBg />

        {/* APP CONTENT */}
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
