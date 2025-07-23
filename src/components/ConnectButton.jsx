import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomConnectButton() {
  return (
    <div className="rainbowkit-connect-wrapper">
      <ConnectButton 
        label="Conectar Wallet"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        chainStatus={{
          smallScreen: 'icon',
          largeScreen: 'full',
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </div>
  );
} 