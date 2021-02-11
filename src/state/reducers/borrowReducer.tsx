import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";

interface BorrowState {
  borrowInterest: string;
  borrowLtv: string;
  borrowLbv: string;
  liquidityAvailable: string;
  lendInterest: string;
}

const initialState = {
  borrowInterest: "",
  borrowLtv: "",
  borrowLbv: "",
  liquidityAvailable: "",
  lendInterest: "",
};

const borrowReducer = (
  state: BorrowState = initialState,
  action: BorrowAction
): BorrowState => {
  switch (action.type) {
    case ActionType.BORROW_INTEREST:
      return { ...state, borrowInterest: action.payload };
    case ActionType.BORROW_LTV:
      return { ...state, borrowLtv: action.payload };
    case ActionType.BORROW_LBV:
      return { ...state, borrowLbv: action.payload };
    case ActionType.LIQUIDITY_AVAILABLE:
      return { ...state, liquidityAvailable: action.payload };
    case ActionType.LEND_INTEREST:
      return { ...state, lendInterest: action.payload };
    default:
      return state;
  }
};

export default borrowReducer;
