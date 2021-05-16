import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";

interface BorrowState {
  borrowLoading: boolean;
  borrowTransHx: string;
  borrowTransHxReceived: boolean;
  borrowErrorMessage: string;

  borrowInterest: string;
  borrowLtv: string;
  borrowLbv: string;
  liquidityAvailable: string;
  lendInterest: string;
  lbAmount1: string;
  lbAmount2: string;
  tokenBalance: string;
}

const initialState = {
  borrowLoading: false,
  borrowTransHx: "",
  borrowTransHxReceived: false,
  borrowErrorMessage: "",

  borrowInterest: "",
  borrowLtv: "",
  borrowLbv: "",
  liquidityAvailable: "",
  lendInterest: "",
  lbAmount1: "",
  lbAmount2: "",
  tokenBalance: "",
};

const borrowReducer = (
  state: BorrowState = initialState,
  action: BorrowAction
): BorrowState => {
  switch (action.type) {
    case ActionType.BORROW_ACTION:
      return { ...state, borrowLoading: true };
    case ActionType.BORROW_HASH:
      return {
        ...state,
        borrowTransHx: action.payload,
        borrowTransHxReceived: true,
      };
    case ActionType.BORROW_FAILED:
      return { ...state, borrowLoading: false, borrowErrorMessage: action.payload };
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
    case ActionType.TOK_BALANCE:
      return { ...state, tokenBalance: action.payload };
    default:
      return state;
  }
};

export default borrowReducer;
