import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";
import { unilendFactorycontract } from ".";

export const UnilendLBPool = (assetPoolAddress: any) => {
  return new web3.eth.Contract(UnilendLB.ubpool, assetPoolAddress);
};

export const UnilendLBFactory = () => {
  return new web3.eth.Contract(UnilendLB.factory, unilendFactorycontract);
};

export const UnilendLBContract = (unilendLbRouter: any) => {
  return new web3.eth.Contract(UnilendLB.ubrouter, unilendLbRouter);
};

export const UnilendLBToken = (assetPoolAddress: any) => {
  return new web3.eth.Contract(UnilendLB.erc20, assetPoolAddress);
};
