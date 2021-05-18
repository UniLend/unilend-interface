import { Wallet } from "components/Helpers/Types";
// import { useCallback } from "react";

import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export default function useWalletConnect() {
  const {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    accountBalance,
    selectedNetworkId,
    walletProvider,
    connectedWallet,
  } = useTypedSelector((state) => state.configureWallet);

  const { connectWalletAction, getAccountBalance } = useActions();
  const handleWalletConnect = (wallet?: Wallet) => {
    console.log("CONNECTING WALLET");
    if (wallet) {
      connectWalletAction(selectedNetworkId, wallet);
    } else {
      connectWalletAction(selectedNetworkId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return {
    walletConnected,
    accounts,
    loading,
    handleWalletConnect,
    getAccountBalance,
    currentProvider,
    accountBalance,
    selectedNetworkId,
    walletProvider,
    connectedWallet,
  };
}
