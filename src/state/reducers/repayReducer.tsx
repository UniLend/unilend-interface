import { ActionType } from "../action-types";
import { RepayAction } from "../actions/repayA";

interface RepayState {
  youOwe: string;
}

const initialState = {
  youOwe: "0",
};

const repayReducer = (
  state: RepayState = initialState,
  action: RepayAction
): RepayState => {
  switch (action.type) {
    case ActionType.YOU_OWE:
      return { ...state, youOwe: action.payload };

    default:
      return state;
  }
};
export default repayReducer;
