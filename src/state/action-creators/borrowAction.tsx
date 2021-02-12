import { Dispatch } from "redux";
import {
  UnilendLBContract,
  UnilendLBPool,
} from "../../ethereum/contracts/UnilendLB";
import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";
import { toDecimalPlace } from "../../utils/index";
import { BigNumber } from "bignumber.js";
import web3 from "../../ethereum/web3";
import { assetAddress, collateralAddress } from "../../ethereum/contracts";
export const getBorrowInterest = (assetPoolAddress: any) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    let unilendLB = UnilendLBPool(assetPoolAddress);
    let borrowAPY: any;
    unilendLB.methods.blockinterestRate().call((error: any, result: any) => {
      if (!error && result) {
        borrowAPY = (parseInt(result) * 4 * 60 * 24 * 365) / 10 ** 12;
        console.log(borrowAPY + "%");
        dispatch({
          type: ActionType.BORROW_INTEREST,
          payload: toDecimalPlace(borrowAPY, 4) + "%",
        });
      } else {
        dispatch({
          type: ActionType.BORROW_INTEREST,
          payload: "-%",
        });
      }
    });
    unilendLB.methods.getLTV().call((error: any, result: any) => {
      if (!error && result) {
        dispatch({
          type: ActionType.BORROW_LTV,
          payload: result.toString() + "%",
        });
      } else {
        dispatch({
          type: ActionType.BORROW_LTV,
          payload: "-%",
        });
      }
    });
    unilendLB.methods.getLBV().call((error: any, result: any) => {
      if (!error && result) {
        dispatch({
          type: ActionType.BORROW_LBV,
          payload: result.toString() + "%",
        });
      } else {
        dispatch({
          type: ActionType.BORROW_LBV,
          payload: "-%",
        });
      }
    });
    unilendLB.methods.tsupplyAmount().call((error: any, result: any) => {
      console.log("tsupplyAmount", result);
      if (!error && result) {
        var totalLend = result.toString();
      }

      unilendLB.methods.tborrowAmount().call((error1: any, result1: any) => {
        if (!error1 && result1) {
          var totalBorrowed = result1.toString();
        }

        var _percTotBorrow: any = 0;
        var _lendAPY: any = 0;
        if (totalLend !== 0 && totalBorrowed !== 0) {
          _percTotBorrow = new BigNumber(totalBorrowed)
            .multipliedBy(100)
            .dividedBy(totalLend);
        }

        if (_percTotBorrow !== 0) {
          _lendAPY = new BigNumber(borrowAPY)
            .multipliedBy(_percTotBorrow)
            .dividedBy(100);
        }

        dispatch({
          type: ActionType.LEND_INTEREST,
          payload: toDecimalPlace(_lendAPY, 4),
        });

        var aBorrowWei = new BigNumber(totalLend)
          .minus(new BigNumber(totalBorrowed))
          .toString();
        let availableBorrow = web3.utils.fromWei(aBorrowWei, "ether");
        dispatch({
          type: ActionType.LIQUIDITY_AVAILABLE,
          payload: availableBorrow,
        });
      });
    });
  };
};

export const handleBorrowValueChange = (
  yourCollateral: any,
  unilendLbRouter: any
) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    console.log(yourCollateral);
    debugger;

    var fullAmount = web3.utils.toWei(yourCollateral, "ether");
    console.log(fullAmount);
    let unilendLB = UnilendLBContract(unilendLbRouter);
    if (new BigNumber(fullAmount).isGreaterThan(0)) {
      unilendLB.methods
        .getEstimateAssetAmount(collateralAddress, assetAddress, fullAmount)
        .call((error: any, result: any) => {
          // console.log(error, result);

          var nValue: any = 0;
          if (!error && result) {
            // result = new BigNumber(result.toString()).minus(100).toString();
            nValue = web3.utils.fromWei(result, "ether");
          }

          if (nValue === "0") {
            //     $(".lbamount2").val(0);
            dispatch({
              type: ActionType.LB_AMOUNT_2,
              payload: 0,
            });
          } else {
            //     $(".lbamount2").val(nValue);
            dispatch({
              type: ActionType.LB_AMOUNT_2,
              payload: nValue,
            });
          }
        });
    } else {
      unilendLB.methods
        .getEstimateAssetAmountFromAsset(
          collateralAddress,
          assetAddress,
          fullAmount
        )
        .call((error: any, result: any) => {
          // console.log(error, result);

          var nValue: any = 0;
          if (!error && result) {
            result = new BigNumber(result.toString()).plus(1000).toString();
            nValue = web3.utils.fromWei(result, "ether");
          }

          if (nValue === "0") {
            dispatch({
              type: ActionType.LB_AMOUNT_1,
              payload: 0,
            });
          } else {
            // $(".lbamount1").val(nValue);
            dispatch({
              type: ActionType.LB_AMOUNT_1,
              payload: nValue,
            });
          }
        });
    }
  };
};
