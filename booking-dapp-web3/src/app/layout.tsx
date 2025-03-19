'use client';

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'; 
import BlockchainBg from '@/components/BlockchainBg'; // adăugăm componenta nouă

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
