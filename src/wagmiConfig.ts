// src/wagmiConfig.ts

import { createConfig, http } from 'wagmi'
import { mainnet, linea, lineaSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  autoConnect: true, // se reconectează automat dacă userul a fost conectat
  ssr: true, // pentru compatibilitate cu Next.js SSR

  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Booking NFT Voucher',
        url: 'https://nftvoucher.ciocan.eu', // URL-ul tău live
        iconUrl: 'https://ciocan.eu/nft-voucher.ico', // favicon-ul tău
      },
    }),
  ],

  chains: [mainnet, linea, lineaSepolia],

  transports: {
    [mainnet.id]: http(),
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
})
