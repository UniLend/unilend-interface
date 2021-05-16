import { ActionType } from "../action-types";
import { RedeemAction } from "../actions/redeemA";

interface RedeemState {
  collateralShare: string;
  collateralShareBase: string;

  redeemLoading: boolean;
  redeemTransHx: string;
  redeemTransHxReceived: boolean;
  redeemErrorMessage: string;
  redeemSuccessMessage: string;
}

const initialState = {
  collateralShare: "0",
  collateralShareBase: "0",

  redeemLoading: false,
  redeemTransHx: "",
  redeemTransHxReceived: false,
  redeemErrorMessage: "",
  redeemSuccessMessage: "",
};

const redeemReducer = (
  state: RedeemState = initialState,
  action: RedeemAction
): RedeemState => {
  switch (action.type) {
    case ActionType.REDEEM_ACTION:
      return { ...state, redeemLoading: true, redeemSuccessMessage :""};
    case ActionType.REDEEM_HASH:
      return {
        ...state,
        redeemTransHx: action.payload,
        redeemTransHxReceived: true,
      };
      case ActionType.REDEEM_SUCCESS:
      return { ...state, redeemLoading: false ,redeemSuccessMessage:"successfully",};
    case ActionType.REDEEM_FAILED:
      return { ...state, redeemLoading: false, redeemErrorMessage: action.payload };
    case ActionType.REDEEM_COLLATERAL_AMOUNT:
      return { ...state, collateralShare: action.payload };
    case ActionType.REDEEM_COLLATERAL_AMOUNT_BASE:
      return { ...state, collateralShareBase: action.payload };
    case ActionType.REDEEM_ACTION_SUCCESS:
      return state;
    case ActionType.REDEEM_ACTION_FAILED:
      return state;

    default:
      return state;
  }
};

export default redeemReducer;
