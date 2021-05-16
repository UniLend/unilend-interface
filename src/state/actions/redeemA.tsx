import { ActionType } from "../action-types";

interface RedeemSuccess {
  type: ActionType.REDEEM_SUCCESS;
  payload: boolean;
}

interface _RedeemAction {
  type: ActionType.REDEEM_ACTION;
}

interface RedeemHash {
  type: ActionType.REDEEM_HASH;
  payload: any;
}

interface RedeemFailed {
  type: ActionType.REDEEM_FAILED;
  payload: string;
}

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
  | RedeemSuccess
  | _RedeemAction
  | RedeemHash
  | RedeemFailed
  | RedeemCollateralAmount
  | RedeemCollateralAmountBase
  | RedeemActionSuccess
  | RedeemActionFailed;
