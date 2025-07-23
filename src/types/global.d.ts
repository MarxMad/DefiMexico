// Tipos globales para RainbowKit y otras librerías
declare global {
  interface Window {
    rainbowkit?: any;
    showWalletOptions?: () => void;
    RAINBOWKIT_CONFIG?: {
      projectId: string;
      appName: string;
      chains: string[];
    };
  }
}

export {}; 