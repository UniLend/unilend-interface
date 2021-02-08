import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";

export const UnilendLBContract = (unilendLbRouter: any) => {
  return new web3.eth.Contract(UnilendLB.ubrouter, unilendLbRouter);
};
