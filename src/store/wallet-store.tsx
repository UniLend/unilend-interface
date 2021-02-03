import { UnilendLBFactory } from "../ethereum/contracts/UnilendLBFactory";
import web3 from "../ethereum/web3";
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
  };
  initStore(actions, {
    walletConnected: false,
    accounts: [],
    unilendLbRouter: "",
  });
};

export default configureWalletStore;
