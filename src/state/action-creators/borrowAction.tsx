import { Dispatch } from "redux";
import {
  UnilendLBContract,
  UnilendLBPool,
  UnilendLBTokenColl,
} from "../../ethereum/contracts/UnilendLB";
import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";
import { toDecimalPlace } from "../../utils/index";
import { BigNumber } from "bignumber.js";
import web3 from "../../ethereum/web3";
import { assetAddress, collateralAddress } from "../../ethereum/contracts";
export const getBorrowInterest = (
  assetPoolAddress: any,
  selectedAccount: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    try {
      let unilendLB = UnilendLBPool(assetPoolAddress, currentProvider);
      let borrowAPY: any;

      unilendLB.methods.blockinterestRate().call((error: any, result: any) => {
        if (!error && result) {
          borrowAPY = (parseInt(result) * 4 * 60 * 24 * 365) / 10 ** 12;
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
      var Token = UnilendLBTokenColl(currentProvider);
      Token.methods
        .balanceOf(selectedAccount)
        .call((error: Error, result: any) => {
          if (!error && result) {
            let tokenBalance = web3.utils.fromWei(result.toString(), "ether");
            dispatch({
              type: ActionType.TOK_BALANCE,
              payload: toDecimalPlace(tokenBalance, 5),
            });
            // $(".tok_balance").text(toDecimalPlace(tokenBalance, 5));
          } else {
            dispatch({
              type: ActionType.TOK_BALANCE,
              payload: "0",
            });
            // $(".tok_balance").text('0');
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleBorrowAction = (
  accounts: any,
  unilendLbRouter: any,
  yourCollateral: any,
  borrowReceived: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    dispatch({
      type: ActionType.BORROW_ACTION,
    });
    const unilendLB = UnilendLBContract(unilendLbRouter, currentProvider);
    const amount1 = web3.utils.toWei(yourCollateral, "ether");
    const amount2 = web3.utils.toWei(borrowReceived, "ether");
    unilendLB.methods
      .borrow(collateralAddress, assetAddress, amount1, amount2)
      .send({
        from: accounts,
      })
      .on("receipt", (res: any) => {
        dispatch({
          type: ActionType.BORROW_SUCCESS,
          payload: true,
        });
      })
      .on("transactionHash", (hash: any) => {
        dispatch({ type: ActionType.BORROW_HASH, payload: hash });
      })
      .on("error", (error: Error) => {
        dispatch({
          type: ActionType.BORROW_FAILED,
          payload: "Transaction Failed",
        });
      });
  };
};

export const handleBorrowValueChange = (
  yourCollateral: any,
  unilendLbRouter: any,
  currentProvider: any
) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    try {
      var fullAmount = yourCollateral
        ? web3.utils.toWei(yourCollateral, "ether")
        : web3.utils.toWei(0, "ether");
      let unilendLB = UnilendLBContract(unilendLbRouter, currentProvider);
      if (new BigNumber(fullAmount).isGreaterThan(0)) {
        unilendLB.methods
          .getEstimateAssetAmount(collateralAddress, assetAddress, fullAmount)
          .call((error: any, result: any) => {
            var nValue: any = 0;
            if (!error && result) {
              nValue = web3.utils.fromWei(result, "ether");
            }

            if (nValue === "0") {
              dispatch({
                type: ActionType.LB_AMOUNT_2,
                payload: 0,
              });
            } else {
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
            var nValue: any = 0;
            if (!error && result) {
              result = new BigNumber(result.toString()).plus(1000).toString();
              nValue = web3.utils.fromWei(result, "ether");
            }

            if (nValue === "0") {
            } else {
              dispatch({
                type: ActionType.LB_AMOUNT_1,
                payload: nValue,
              });
            }
          });
      }
    } catch (e) {
      dispatch({
        type: ActionType.LB_AMOUNT_2,
        payload: "",
      });
      dispatch({
        type: ActionType.LB_AMOUNT_1,
        payload: "",
      });
    }
  };
};
