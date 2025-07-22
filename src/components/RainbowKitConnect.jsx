import React from 'react';
import { RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http, useAccount, useBalance, useEnsName } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

const queryClient = new QueryClient();

// Componente personalizado para el layout de wallet
function CustomWalletDisplay() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const { data: ensName } = useEnsName({
    address,
  });

  if (!isConnected) {
    return (
      <ConnectButton 
        label="Conectar Wallet"
        showBalance={{
          smallScreen: true,
          largeScreen: true,
        }}
        chainStatus={{
          smallScreen: "icon",
          largeScreen: "icon",
        }}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        modalSize="compact"
      />
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div className="custom-wallet-layout">
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="connect-button">
                    Conectar Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="wrong-network-button">
                    Red incorrecta
                  </button>
                );
              }

              return (
                <div className="wallet-info-container">
                  {/* Chain info arriba */}
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="chain-button"
                  >
                    {chain.hasIcon && (
                      <div className="chain-icon">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="chain-name">{chain.name}</span>
                  </button>

                  {/* Wallet info abajo */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="account-button"
                  >
                    <div className="account-avatar">
                      {account.ensAvatar ? (
                        <img
                          alt={account.ensAvatar}
                          src={account.ensAvatar}
                          style={{ width: 20, height: 20, borderRadius: '50%' }}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {account.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="account-info">
                      <span className="account-name">
                        {account.displayName}
                      </span>
                      {balance && (
                        <span className="account-balance">
                          {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function RainbowKitConnect() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#10b981',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'large',
            backgroundBlur: 'large',
            background: '#232326',
            modalBackground: '#2d2d31',
            modalBackdrop: 'rgba(0, 0, 0, 0.8)',
          })}
        >
          <CustomWalletDisplay />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 