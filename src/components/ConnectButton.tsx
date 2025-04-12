'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import Image from 'next/image';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center space-y-2">
      {isConnected && address ? (
        <>
          <p className="text-xs text-gray-400 mb-1">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button onClick={() => disconnect()} className="futuristic-btn w-full">
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={() => connect({ connector: metaMask() })}
          className="futuristic-btn w-full flex items-center justify-center gap-2"
        >
          <Image src="/MetaMask.svg" alt="MetaMask" width={20} height={20} />
          Connect MetaMask
        </button>
      )}
    </div>
  );
}
