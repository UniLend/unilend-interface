// import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";
import { collateralAddress, unilendFactorycontract } from ".";

export const UnilendLBPool = (assetPoolAddress: any, currentProvider: any) => {
  return new currentProvider.eth.Contract(UnilendLB.ubpool, assetPoolAddress);
};

export const UnilendLBFactory = (currentProvider: any) => {
  return new currentProvider.eth.Contract(
    UnilendLB.factory,
    unilendFactorycontract
  );
};

export const UnilendLBContract = (
  unilendLbRouter: any,
  currentProvider: any
) => {
  return new currentProvider.eth.Contract(UnilendLB.ubrouter, unilendLbRouter);
};

export const UnilendLBToken = (assetPoolAddress: any, currentProvider: any) => {
  return new currentProvider.eth.Contract(UnilendLB.erc20, assetPoolAddress);
};

export const UnilendLBTokenColl = (currentProvider: any) => {
  return new currentProvider.eth.Contract(UnilendLB.erc20, collateralAddress);
};
