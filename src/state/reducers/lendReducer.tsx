import { ActionType } from "state/action-types";
import { LendAction } from "state/actions/lendA";

interface LendState {
  lendLoading: boolean;
  lendTransHx: string;
  lendTransHxReceived: boolean;
  lendErrorMessage: string;
  lendSuccessMessage: string;
}
const initialState = {
  lendLoading: false,
  lendTransHx: "",
  lendTransHxReceived: false,
  lendErrorMessage: "",
  lendSuccessMessage: "",
};

const lendReducer = (
  state: LendState = initialState,
  action: LendAction
): LendState => {
  switch (action.type) {
    case ActionType.LEND_ACTION:
      return { ...state, lendLoading: true, lendSuccessMessage :"",
      lendErrorMessage:"",lendTransHxReceived: false,lendTransHx:""};
    case ActionType.LEND_HASH:
      return {
        ...state,
        lendTransHx: action.payload,
        lendTransHxReceived: true,
      };
      case ActionType.LEND_SUCCESS:
      return { ...state, lendLoading: false ,lendSuccessMessage:"lended successfully",};
    case ActionType.LEND_FAILED:
      return { ...state, lendLoading: false, lendErrorMessage: action.payload };
    default:
      return { ...state };
  }
};

export default lendReducer;
