import web3 from "../web3";
import UnilendLB from "../build/UnilendLB.json";
import { unilendFactorycontract } from ".";

export const UnilendLBFactory = () => {
  return new web3.eth.Contract(UnilendLB.factory, unilendFactorycontract);
};
