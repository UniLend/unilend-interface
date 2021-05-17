import { ActionType } from "../action-types";
import { RepayAction } from "../actions/repayA";

interface RepayState {
  youOwe: string;

  repayLoading: boolean;
  repayTransHx: string;
  repayTransHxReceived: boolean;
  repayErrorMessage: string;
  repaySuccessMessage: string;
}

const initialState = {
  youOwe: "0",
  repayLoading: false,
  repayTransHx: "",
  repayTransHxReceived: false,
  repayErrorMessage: "",
  repaySuccessMessage: "",
};

const repayReducer = (
  state: RepayState = initialState,
  action: RepayAction
): RepayState => {
  switch (action.type) {
    case ActionType.YOU_OWE:
      return { ...state, youOwe: action.payload };

      case ActionType.REPAY_ACTION:
        return { ...state, repayLoading: true, repaySuccessMessage :"",
        repayErrorMessage:"",repayTransHxReceived: false,repayTransHx:""};
      case ActionType.REPAY_HASH:
        return {
          ...state,
          repayTransHx: action.payload,
          repayTransHxReceived: true,
        };
        case ActionType.REPAY_SUCCESS:
        return { ...state, repayLoading: false ,repaySuccessMessage:"Repayed successfully",};
      case ActionType.REPAY_FAILED:
        return { ...state, repayLoading: false, repayErrorMessage: action.payload };
      default:
        return { ...state };
    }
  };
export default repayReducer;
