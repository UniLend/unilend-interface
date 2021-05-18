import { Dispatch } from "redux";
import {
  UnilendLBContract,
  UnilendLBPool,
  UnilendLBToken,
} from "../../ethereum/contracts/UnilendLB";
import web3 from "../../ethereum/web3";
import { ActionType } from "../action-types";
import { RedeemAction } from "../actions/redeemA";
// import BigNumber from "bignumber.js";

export const getCollateralAmount = (
  assetPoolAddress: any,
  selectedAccount: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      const unilendLB = UnilendLBToken(assetPoolAddress, currentProvider);
      unilendLB.methods
        .balanceOf(selectedAccount)
        .call((error: any, result: any) => {
          if (!error && result) {
            let colleteralShare = web3.utils.fromWei(
              result.toString(),
              "ether"
            );
            dispatch({
              type: ActionType.REDEEM_COLLATERAL_AMOUNT,
              payload: colleteralShare,
            });
          } else {
            console.log("colleteralShare", error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCollateralAmountBase = (
  assetPoolAddress: any,
  selectedAccount: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      const unilendLB = UnilendLBPool(assetPoolAddress, currentProvider);
      unilendLB.methods
        .lendingBalanceOf(selectedAccount)
        .call((error: any, result: any) => {
          if (!error && result) {
            let colleteralFull = web3.utils.fromWei(result.toString(), "ether");
            dispatch({
              type: ActionType.REDEEM_COLLATERAL_AMOUNT_BASE,
              payload: colleteralFull,
            });
            // $(".collateralAmountBase").text("~ "+colleteralFull);
          } else {
            // $(".collateralAmountBase").text('0');
            dispatch({
              type: ActionType.REDEEM_COLLATERAL_AMOUNT_BASE,
              payload: "",
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleRedeemAction = (
  unilendLbRouter: any,
  redeemAmount: any,
  accounts: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      dispatch({
        type: ActionType.REDEEM_ACTION,
      });
      const unilendLB = UnilendLBContract(unilendLbRouter, currentProvider);
      let fullAmount = web3.utils.toWei(redeemAmount, "ether");
      unilendLB.methods
        .redeemETH(fullAmount)
        .send({
          from: accounts[0],
        })
        .on("receipt", (res: any) => {
          dispatch({
            type: ActionType.REDEEM_SUCCESS,
            payload: true,
          });
        })
        .on("transactionHash", (hash: any) => {
          dispatch({
            type: ActionType.REDEEM_HASH,
            payload: hash,
          });
        })
        .on("error", function (error: Error) {
          dispatch({
            type: ActionType.REDEEM_FAILED,
            payload: "Transaction Failed",
          });
        });
      dispatch({
        type: ActionType.HANDLE_REDEEM,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
