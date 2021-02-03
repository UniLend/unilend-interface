import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";

export const UnilendLBContract = (unilendLbRouter: any) => {
  console.log("contract", unilendLbRouter);
  return new web3.eth.Contract(UnilendLB.ubrouter, unilendLbRouter);
};
