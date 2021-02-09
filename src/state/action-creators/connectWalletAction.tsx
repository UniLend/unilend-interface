import { Dispatch } from "redux";
import { assetAddress, collateralAddress } from "../../ethereum/contracts";
import { UnilendLBFactory } from "../../ethereum/contracts/UnilendLBFactory";
import { web3Service } from "../../ethereum/web3Service";
import { ActionType } from "../action-types";
import { Action } from "../actions/connectWalletA";

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
    } catch (e) {}
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
      accounts.on("accountsChanged", (accounts: any) => {
        console.log(accounts);
      });

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
