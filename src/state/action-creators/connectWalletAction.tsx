import { Dispatch } from "redux";
import { assetAddress, collateralAddress } from "../../ethereum/contracts";
import { UnilendLBFactory } from "../../ethereum/contracts/UnilendLB";
import { web3Service } from "../../ethereum/web3Service";
import { ActionType } from "../action-types";
import { Action } from "../actions/connectWalletA";

export const setSelectedNetworkId = (selectedNetworkId: number) => ({
  type: ActionType.SELECTED_NETWORK_ID,
  networkId: selectedNetworkId,
});

export const checkNet = (net: any) => {
  switch (net) {
    case 1:
      return "Mainnet";
    case 42:
      return "Kovan";
    case 3:
      return "Ropsten";
    case 4:
      return "RinkeBy";
    case 5:
      return "Goerli";
    case 56:
      return "Binance Mainnet";
    case 97:
      return "Binance Testnet";
    case 80001:
      return "Mumbai Testnet";
    case 137:
      return "Matic Mainnet";
    default:
      return "Localhost";
  }
};

export const networkSwitchHandling = (currentProvider?: any, id?: any) => {
  return async (dispatch: Dispatch<Action>) => {
    await currentProvider.eth.net.getId().then((res: any) => {
      let accsName = checkNet(res);
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: res,
      });
    });
    
    if (id) {
      let accsName = checkNet(id);
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: id,
      });
    }
  };
};

// const metamaskEventHandler = (dispatch: any, provider: any) => {
//   provider.on("chainChanged", (chainId: any) => {
//     window.location.reload();
//   });
//   provider.on("accountsChanged", function (accounts: string) {
//     dispatch({
//       type: ActionType.CONNECT_WALLET_SUCCESS,
//       payload: [accounts[0]],
//     });
//   });
//   provider.on("message", (message: any) => {
//     // console.log(message);
//   });
//   provider.on("disconnect", (code: number, reason: string) => {
//     dispatch({
//       type: ActionType.WALLET_DISCONNECT,
//     });
//   });
// };

export const getAccountBalance = (selectedAccount: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let balance = await web3Service.getBalance(selectedAccount);
      let ethBal = web3Service.getWei(balance, "ether");
      let ethBalDeci = ethBal.slice(0, 7);
      dispatch({
        type: ActionType.ACCOUNT_BALANCE,
        payload: ethBalDeci,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const connectWalletAction = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });

    try {
      let accounts: any;
      accounts = await web3Service.getAccounts();

      if (window && !(window as any).ethereum.selectedAddress) {
        (window as any).ethereum.enable().then(() => {
          var unilendLBFactory = UnilendLBFactory();
          getAccountBalance(accounts[0]);
          unilendLBFactory.methods.router().call((error: any, result: any) => {
            if (!error && result) {
              dispatch({ type: ActionType.LB_FACTORY, payload: result });
              unilendLBFactory.methods
                .getPools([assetAddress, collateralAddress])
                .call((error1: any, result1: any) => {
                  if (!error1 && result1) {
                    dispatch({
                      type: ActionType.SET_POOL_ADDRESS,
                      payload: [result1[0], result1[1]],
                    });
                  }
                });
            }
          });
        });
      } else {
        var unilendLBFactory = UnilendLBFactory();
        getAccountBalance(accounts[0]);
        unilendLBFactory.methods.router().call((error: any, result: any) => {
          if (!error && result) {
            dispatch({ type: ActionType.LB_FACTORY, payload: result });
            unilendLBFactory.methods
              .getPools([assetAddress, collateralAddress])
              .call((error1: any, result1: any) => {
                if (!error1 && result1) {
                  dispatch({
                    type: ActionType.SET_POOL_ADDRESS,
                    payload: [result1[0], result1[1]],
                  });
                }
              });
          } else {
            console.log(error);
          }
        });
        let balance = await web3Service.getBalance(accounts[0]);
        let ethBal = web3Service.getWei(balance, "ether");
        let ethBalDeci = ethBal.slice(0, 7);
        dispatch({
          type: ActionType.ACCOUNT_BALANCE,
          payload: ethBalDeci,
        });
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const walletDisconnect = (walletProvider: any) => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:id"
    );
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:secret  "
    );
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:linked"
    );
    localStorage.removeItem("walletConnected");
    // if (walletProvider === (window as any).ethereum) walletProvider.disable();
    // await walletProvider.disconnect();
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    });
  };
};