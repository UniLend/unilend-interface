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
  selectedAccount: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    const unilendLB = UnilendLBToken(assetPoolAddress);
    unilendLB.methods
      .balanceOf(selectedAccount)
      .call((error: any, result: any) => {
        if (!error && result) {
          let colleteralShare = web3.utils.fromWei(result.toString(), "ether");
          dispatch({
            type: ActionType.REDEEM_COLLATERAL_AMOUNT,
            payload: colleteralShare,
          });
        } else {
          console.log("colleteralShare", error);
        }
      });
  };
};

export const getCollateralAmountBase = (
  assetPoolAddress: any,
  selectedAccount: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    const unilendLB = UnilendLBPool(assetPoolAddress);
    unilendLB.methods
      .lendingBalanceOf(selectedAccount)
      .call((error: any, result: any) => {
        console.log(error, result);

        if (!error && result) {
          let colleteralFull = web3.utils.fromWei(result.toString(), "ether");
          console.log(result);
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
  };
};

export const getTSupply = (assetPoolAddress: string) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    let unilendLB = UnilendLBPool(assetPoolAddress);
    unilendLB.methods.tsupplyAmount().call((error: any, result: any) => {
      console.log("tsupplyAmount", result);

      if (!error && result) {
        var totalLend = result.toString();
      }

      unilendLB.methods.tborrowAmount().call((error1: any, result1: any) => {
        console.log("tborrowAmount", result1);

        if (!error1 && result1) {
          var totalBorrowed = result1.toString();
          console.log("totalBorrowed", totalBorrowed);
        }

        var _percTotBorrow: any = 0;
        if (totalLend !== 0 && totalBorrowed !== 0) {
          //   _percTotBorrow = new BigNumber(totalBorrowed)
          //     .multipliedBy(100)
          //     .dividedBy(totalLend);
          //   console.log(_percTotBorrow);
        }

        if (_percTotBorrow !== 0) {
          // lendAPY = (new BigNumber(borrowAPY).multipliedBy(_percTotBorrow)).dividedBy(100);
        }

        // $(".lend_interest").text(toDecimalPlace(lendAPY, 4)+"%");

        // var aBorrowWei = (new BigNumber(totalLend).minus(new BigNumber(totalBorrowed))).toString();
        // let availableBorrow = web3.utils.fromWei(aBorrowWei, 'ether');
        // $(".avail").text(availableBorrow);
      });
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
