import { ActionType } from "../action-types";

interface RedeemCollateralAmount {
  type: ActionType.REDEEM_COLLATERAL_AMOUNT;
  payload: string;
}

interface RedeemCollateralAmountBase {
  type: ActionType.REDEEM_COLLATERAL_AMOUNT_BASE;
  payload: string;
}

interface RedeemActionSuccess {
  type: ActionType.REDEEM_ACTION_SUCCESS;
  payload: string;
}

interface RedeemActionFailed {
  type: ActionType.REDEEM_ACTION_FAILED;
  payload: Error;
}

export type RedeemAction =
  | RedeemCollateralAmount
  | RedeemCollateralAmountBase
  | RedeemActionSuccess
  | RedeemActionFailed;
