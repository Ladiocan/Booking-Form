import { http, createConfig } from 'wagmi';
import { mainnet, linea, lineaSepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

// ✅ Recomandat de MetaMask pentru UX (nume dapp + icon)
export const wagmiConfig = createConfig({
  ssr: true, // necesar pentru Next.js + wagmi v2
  chains: [mainnet, linea, lineaSepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Booking DApp',
        url: 'https://ciocan.eu',
        iconUrl: 'https://ciocan.eu/favicon.ico',
      },
      logging: {
        developerMode: true,
        sdk: true,
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
});
