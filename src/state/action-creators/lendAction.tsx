import { Dispatch } from "redux";
import { UnilendLBContract } from "../../ethereum/contracts/UnilendLB";
import web3 from "../../ethereum/web3";
import { ActionType } from "../action-types";
import { LendAction } from "../actions/lendA";

export const handleLendAction = (
  unilendLbRouter: string,
  accounts: string[],
  lendAmount: string
) => {
  return async (dispatch: Dispatch<LendAction>) => {
    dispatch({
      type: ActionType.LEND_ACTION,
    });
    try {
      const unilendLB = UnilendLBContract(unilendLbRouter);
      unilendLB.methods
        .lendETH()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(lendAmount, "ether"),
        })
        .on("receipt", (res: any) => {})
        .on("transactionHash", (hash: any) => {
          dispatch({ type: ActionType.LEND_HASH, payload: hash });
        })
        .on("error", (error: Error) => {
          dispatch({
            type: ActionType.LEND_FAILED,
            payload: "Transaction Failed",
          });
        });
      dispatch({
        type: ActionType.HANDLE_LEND,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
