import { assetAddress, collateralAddress } from "../ethereum/contracts";
import {
  UnilendLBContract,
  UnilendLBFactory,
  UnilendLBPool,
} from "../ethereum/contracts/UnilendLB";
import web3 from "../ethereum/web3";
var unilendLBFactory = (currentProvider: any) =>
  UnilendLBFactory(currentProvider);

export const getRepayBalance = (
  assetPoolAddress: any,
  accounts: any,
  currentProvider: any
): any => {
  let unilendLB = UnilendLBPool(assetPoolAddress, currentProvider);
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
  repayValue: any,
  currentProvider: any
) => {
  const unilendLB = UnilendLBContract(unilendLbRouter, currentProvider);
  let fullAmount = web3.utils.toWei(repayValue, "ether");
  return unilendLB.methods.repayETH(collateralAddress).send({
    from: accounts[0],
    value: fullAmount,
  });
};
