import { Dispatch } from "redux";
import { web3Service } from "../../ethereum/web3Service";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const connectWalletAction = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });

    try {
      let accounts;
      accounts = await web3Service.getAccounts();
      dispatch({
        type: ActionType.CONNECT_WALLET_SUCCESS,
        payload: [...accounts],
      });
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};
