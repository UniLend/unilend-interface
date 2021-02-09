import { Dispatch } from "redux";
import { UnilendLBContract } from "../../ethereum/contracts/UnilendLBContract";
import web3 from "../../ethereum/web3";
import { ActionType } from "../action-types";
import { RedeemAction } from "../actions/redeemA";

export const getCollateralAmount = () => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({
      type: ActionType.REDEEM_COLLATERAL_AMOUNT,
      payload: "",
    });
  };
};

export const getCollateralAmountBase = () => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({
      type: ActionType.REDEEM_COLLATERAL_AMOUNT_BASE,
      payload: "",
    });
  };
};

export const handleRedeemAction = (
  unilendLbRouter: any,
  redeemAmount: any,
  accounts: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    const unilendLB = UnilendLBContract(unilendLbRouter);
    let fullAmount = web3.utils.toWei(redeemAmount, "ether");
    unilendLB.methods
      .redeemETH(fullAmount)
      .send({
        from: accounts[0],
      })
      .on("transactionHash", (result: any) => {
        dispatch({
          type: ActionType.REDEEM_ACTION_SUCCESS,
          payload: result,
        });
      })
      .on("error", function (error: Error) {
        dispatch({
          type: ActionType.REDEEM_ACTION_FAILED,
          payload: error,
        });
      });
  };
};
