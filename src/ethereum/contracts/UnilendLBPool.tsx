import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";

export const UnilendLBPool = (assetPoolAddress: any) => {
  return new web3.eth.Contract(UnilendLB.ubpool, assetPoolAddress);
};
