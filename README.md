Booking NFT Voucher DApp

A Web3-powered decentralized application (DApp) built with Next.js, TailwindCSS, Wagmi, and Ethers.js that allows users to generate and mint NFT-based travel vouchers (for hotels, flights, tours, etc.) on the Linea Sepolia testnet.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Features:
1.MetaMask Integration – connect wallet & sign transactions
2.Custom NFT Voucher Generator using canvas
3.Dynamic metadata & QR code embedding
4.Uploads to IPFS via Pinata (image + metadata)
5.Smart contract minting on-chain
6.Success UI with image preview & download

Tech Stack:
1.Frontend: Next.js (App Router), TailwindCSS, React
2.Web3: Wagmi + Ethers.js v6 + MetaMask
3.Smart Contract: Solidity ERC-721 (VoucherNFT.sol)
4.Pinning service: Pinata IPFS (JWT auth)
5.Metamask SDK

How It Works:
1.Connect your wallet (MetaMask)
2.Fill out the travel booking form
3.Generate a voucher NFT preview (custom canvas with QR + details)
4.Confim Mint (Upload image + metadata to IPFS via Pinata)
5.Mint the NFT to your wallet on Linea Sepolia
6.Receive a success popup with preview

🧪 **Demo Video**: [Watch on YouTube](https://youtu.be/0RBVScBUvbk)  

Setup: 
# Clone the repo
https://github.com/Ladiocan/Booking-Form.git
cd Booking-Form

# Install dependencies
npm install

# Create your .env.local file
# Add your Pinata JWT
PINATA_JWT=your_pinata_jwt_here

# Run the app
npm run dev
## Getting Started

Smart Contract (VoucherNFT.sol)
Deployed to Linea Sepolia Testnet
Contract Address: 0xd8df6B5048463439136beEa0ecc6968DCaB736e2


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
