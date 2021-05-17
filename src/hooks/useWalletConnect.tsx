import { useCallback } from "react";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export default function useWalletConnect() {
  const { walletConnected, accounts, loading,currentProvider,accountBalance, } = useTypedSelector(
    (state) => state.configureWallet
  );

  const { connectWalletAction } = useActions();
  const handleWalletConnect = useCallback(() => {
    console.log("CONNECTING WALLET");
    connectWalletAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { walletConnected, accounts, loading, handleWalletConnect,currentProvider,accountBalance, };
}
