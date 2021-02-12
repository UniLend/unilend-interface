import { ActionType } from "../action-types";

interface BorrowInterest {
  type: ActionType.BORROW_INTEREST;
  payload: string;
}

interface BorrowLtv {
  type: ActionType.BORROW_LTV;
  payload: string;
}

interface BorrowLbv {
  type: ActionType.BORROW_LBV;
  payload: string;
}

interface LiquidityAvailable {
  type: ActionType.LIQUIDITY_AVAILABLE;
  payload: string;
}

interface LendInterest {
  type: ActionType.LEND_INTEREST;
  payload: string;
}

interface LbAmount1 {
  type: ActionType.LB_AMOUNT_1;
  payload: any;
}

interface LbAmount2 {
  type: ActionType.LB_AMOUNT_2;
  payload: any;
}

export type BorrowAction =
  | BorrowInterest
  | BorrowLtv
  | BorrowLbv
  | LiquidityAvailable
  | LendInterest
  | LbAmount1
  | LbAmount2;
