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

export type BorrowAction =
  | BorrowInterest
  | BorrowLtv
  | BorrowLbv
  | LiquidityAvailable;
