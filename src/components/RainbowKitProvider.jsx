import React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { http } from 'viem';

const { connectors } = getDefaultWallets({
  appName: 'DeFi México',
  projectId: '2c7a9eb62deed3a6572869902c5f02a9',
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
});

const wagmiConfig = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [zora.id]: http(),
  },
});

const customTheme = darkTheme({
  accentColor: '#10b981',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

function DeFiRainbowKitProvider({ children }) {
  return React.createElement(WagmiConfig, { config: wagmiConfig },
    React.createElement(RainbowKitProvider, {
      chains: [mainnet, polygon, optimism, arbitrum, base, zora],
      theme: customTheme,
      locale: "es-ES"
    }, children)
  );
}

export default DeFiRainbowKitProvider; 