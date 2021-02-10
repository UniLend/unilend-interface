import { ActionType } from "../action-types";

interface BorrowInterest {
  type: ActionType.BORROW_INTEREST;
  payload: string;
}

interface BorrowLtv {
  type: ActionType.BORROW_LTV;
  payload: string;
}

export type BorrowAction = BorrowInterest | BorrowLtv;
