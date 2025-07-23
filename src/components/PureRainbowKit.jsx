import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function PureRainbowKit() {
  console.log('PureRainbowKit montado correctamente');
  
  return React.createElement('div', {
    style: {
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      margin: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }
  }, [
    React.createElement('h3', {
      key: 'title',
      style: { margin: '0 0 1rem 0', color: 'white' }
    }, '🔗 RainbowKit Puro'),
    React.createElement('p', {
      key: 'description',
      style: { margin: '0 0 1rem 0', color: 'rgba(255, 255, 255, 0.7)' }
    }, 'Componente RainbowKit sin JSX'),
    React.createElement(ConnectButton, {
      key: 'connect-button',
      label: "Conectar Wallet",
      accountStatus: {
        smallScreen: 'avatar',
        largeScreen: 'full',
      },
      chainStatus: {
        smallScreen: 'icon',
        largeScreen: 'full',
      },
      showBalance: {
        smallScreen: false,
        largeScreen: true,
      }
    })
  ]);
}

export default PureRainbowKit; 