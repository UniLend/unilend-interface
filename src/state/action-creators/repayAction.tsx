import { Dispatch } from "redux";
import { collateralAddress } from "../../ethereum/contracts";
import { UnilendLBContract } from "../../ethereum/contracts/UnilendLB";
import { ActionType } from "../action-types";
import { RepayAction } from "../actions/repayA";
import web3 from "../../ethereum/web3";

export const getOweValue = (
  unilendLbRouter: string,
  selectedAccount: string,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<RepayAction>) => {
    try {
      let unilendLBRouter = UnilendLBContract(unilendLbRouter, currentProvider);
      unilendLBRouter.methods
        .getCollateralAmount(collateralAddress, selectedAccount)
        .call((error: any, result: any) => {
          // console.log(error, result);

          if (!error && result) {
            dispatch({
              type: ActionType.YOU_OWE,
              payload: result,
            });
          } else {
            dispatch({
              type: ActionType.YOU_OWE,
              payload: "0",
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleRepayAction = (
  unilendLbRouter: any,
  accounts: any,
  tAmount: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<RepayAction>) => {
    try {
      console.log("Calliong");
      dispatch({
        type: ActionType.REPAY_ACTION,
      });
      const unilendLB = UnilendLBContract(unilendLbRouter, currentProvider);
      let fullAmount = web3.utils.toWei(tAmount, "ether");
      unilendLB.methods
        .repayETH(collateralAddress)
        .send({
          from: accounts[0],
          value: fullAmount,
        })
        .on("receipt", (res: any) => {
          dispatch({
            type: ActionType.REPAY_SUCCESS,
            payload: true,
          });
        })
        .on("transactionHash", (hash: any) => {
          dispatch({
            type: ActionType.REPAY_HASH,
            payload: hash,
          });
        })
        .on("error", function (error: Error) {
          dispatch({
            type: ActionType.REPAY_FAILED,
            payload: "Transaction Failed",
          });
        });
      dispatch({
        type: ActionType.HANDLE_REPAY,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
