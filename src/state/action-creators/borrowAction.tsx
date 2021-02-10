import { Dispatch } from "redux";
import { UnilendLBPool } from "../../ethereum/contracts/UnilendLB";
import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";
import { toDecimalPlace } from "../../utils/index";
export const getBorrowInterest = (assetPoolAddress: any) => {
  return async (dispatch: Dispatch<BorrowAction>) => {
    let unilendLB = UnilendLBPool(assetPoolAddress);

    unilendLB.methods.blockinterestRate().call((error: any, result: any) => {
      // console.log(error, result);
      if (!error && result) {
        let borrowAPY = (parseInt(result) * 4 * 60 * 24 * 365) / 10 ** 12;
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
