import { initStore } from "./store";

const configureWalletStore = () => {
  const actions = {
    CONNECT_WALLET: (curState: any, payload: any) => {
      let accounts;
      accounts = payload.accounts;

      console.log(accounts);
      //   if (typeof (window as any).ethereum !== "undefined") {
      //     accounts = (window as any).ethereum.request({
      //       method: "eth_requestAccounts",
      //     });
      //     console.log("MetaMask is installed!");
      //   }
      return { walletConnected: true, accounts: payload.accounts };
    },
    LB_FACTORY: (curState: any, payload: any) => {
      return { unilendLbRouter: payload.unilendLbRouter };
    },
    SET_POOL_ADDRESS: (curState: any, payload: any) => {
      return {
        assetPoolAddress: payload.assetPoolAddress,
        collateralPoolAddress: payload.collateralPoolAddress,
      };
    },
  };
  initStore(actions, {
    walletConnected: false,
    accounts: [],
    unilendLbRouter: "",
    assetPoolAddress: "",
    collateralPoolAddress: "",
  });
};

export default configureWalletStore;
