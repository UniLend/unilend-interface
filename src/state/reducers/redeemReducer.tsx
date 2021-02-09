import { ActionType } from "../action-types";
import { RedeemAction } from "../actions/redeemA";

interface RedeemState {
  collateralShare: string;
  collateralShareBase: string;
}

const initialState = {
  collateralShare: "0",
  collateralShareBase: "0",
};

const redeemReducer = (
  state: RedeemState = initialState,
  action: RedeemAction
): RedeemState => {
  switch (action.type) {
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
