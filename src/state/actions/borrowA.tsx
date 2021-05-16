import { ActionType } from "../action-types";


interface _BorrowAction {
  type: ActionType.BORROW_ACTION;
}

interface BorrowHash {
  type: ActionType.BORROW_HASH;
  payload: any;
}

interface BorrowFailed {
  type: ActionType.BORROW_FAILED;
  payload: string;
}

interface BorrowLend {
  type: ActionType.HANDLE_BORROW;
}

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

interface TokenBalance {
  type: ActionType.TOK_BALANCE;
  payload: string;
}

export type BorrowAction =
  | _BorrowAction
  | BorrowHash
  | BorrowFailed
  | BorrowLend
  | BorrowInterest
  | BorrowLtv
  | BorrowLbv
  | LiquidityAvailable
  | LendInterest
  | LbAmount1
  | LbAmount2
  | TokenBalance;
