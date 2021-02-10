import { ActionType } from "../action-types";
import { BorrowAction } from "../actions/borrowA";

interface BorrowState {
  borrowInterest: string;
  borrowLtv: string;
  borrowLbv: string;
}

const initialState = {
  borrowInterest: "",
  borrowLtv: "",
  borrowLbv: "",
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
    default:
      return state;
  }
};

export default borrowReducer;
