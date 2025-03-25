import { http, createConfig } from 'wagmi';
import { mainnet, linea, lineaSepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  ssr: true, 
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
