import { assetAddress, collateralAddress } from "../ethereum/contracts";
import { UnilendLBContract } from "../ethereum/contracts/UnilendLBContract";
import { UnilendLBFactory } from "../ethereum/contracts/UnilendLBFactory";
import { UnilendLBPool } from "../ethereum/contracts/UnilendLBPool";
import web3 from "../ethereum/web3";
var unilendLBFactory = UnilendLBFactory();

export const getUniLendLbRouter = (dispatch: any) => {
  unilendLBFactory.methods.router().call((error: any, result: any) => {
    dispatch("LB_FACTORY", { unilendLbRouter: result });
    if (!error && result) {
      unilendLBFactory.methods
        .getPools([assetAddress, collateralAddress])
        .call((error1: any, result1: any) => {
          if (!error1 && result1) {
            dispatch("SET_POOL_ADDRESS", {
              assetPoolAddress: result1[0],
              collateralPoolAddress: result1[1],
            });
          }
        });
    }
  });
};

export const getRepayBalance = (assetPoolAddress: any, accounts: any): any => {
  let unilendLB = UnilendLBPool(assetPoolAddress);
  unilendLB.methods
    .borrowBalanceOf(accounts[0])
    .call((error: any, result: any) => {
      // console.log(error, result);
      if (!error && result) {
        let tAmount = web3.utils.fromWei(result.toString(), "ether");
        console.log("T ----", tAmount);
        Promise.resolve(tAmount);
      } else {
        console.log(error);
      }
    });
};

export const handleRepayService = (
  accounts: any,
  unilendLbRouter: any,
  repayValue: any
) => {
  const unilendLB = UnilendLBContract(unilendLbRouter);
  let fullAmount = web3.utils.toWei(repayValue, "ether");
  return unilendLB.methods.repayETH(collateralAddress).send({
    from: accounts[0],
    value: fullAmount,
  });
};
