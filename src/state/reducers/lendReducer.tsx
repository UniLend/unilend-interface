import { ActionType } from "state/action-types";
import { LendAction } from "state/actions/lendA";

interface LendState {
  lendLoading: boolean;
  lendTransHx: string;
  lendTransHxReceived: boolean;
  lendErrorMessage: string;
}
const initialState = {
  lendLoading: false,
  lendTransHx: "",
  lendTransHxReceived: false,
  lendErrorMessage: "",
};

const lendReducer = (
  state: LendState = initialState,
  action: LendAction
): LendState => {
  switch (action.type) {
    case ActionType.LEND_ACTION:
      return { ...state, lendLoading: true };
    case ActionType.LEND_HASH:
      return {
        ...state,
        lendTransHx: action.payload,
        lendTransHxReceived: true,
      };
    case ActionType.LEND_FAILED:
      return { ...state, lendLoading: false, lendErrorMessage: action.payload };
    default:
      return { ...state };
  }
};

export default lendReducer;
