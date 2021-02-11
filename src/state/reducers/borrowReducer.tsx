import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";

interface BorrowState {
  borrowInterest: string;
  borrowLtv: string;
  borrowLbv: string;
  liquidityAvailable: string;
  lendInterest: string;
  lbAmount1: number;
  lbAmount2: number;
}

const initialState = {
  borrowInterest: "",
  borrowLtv: "",
  borrowLbv: "",
  liquidityAvailable: "",
  lendInterest: "",
  lbAmount1: 0,
  lbAmount2: 0,
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
    case ActionType.LB_AMOUNT_1:
      return { ...state, lbAmount1: action.payload };
    case ActionType.LB_AMOUNT_2:
      return { ...state, lbAmount2: action.payload };
    default:
      return state;
  }
};

export default borrowReducer;
