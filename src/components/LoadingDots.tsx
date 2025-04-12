import React from 'react';

export default function LoadingDots() {
  return (
    <span className="inline-flex ml-1">
      <span className="text-black-300 animate-[dotPulse_1s_ease-in-out_0s_infinite]">.</span>
      <span className="text-black-300 animate-[dotPulse_1s_ease-in-out_0.2s_infinite]">.</span>
      <span className="text-black-300 animate-[dotPulse_1s_ease-in-out_0.4s_infinite]">.</span>
    </span>
  );
}
