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
interface HandleRedeem {
  type: ActionType.HANDLE_REDEEM;
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

interface RedeemFailed {
  type: ActionType.REDEEM_FAILED;
  payload: string;
}

export type RedeemAction =
  | RedeemSuccess
  | _RedeemAction
  | RedeemHash
  | HandleRedeem
  | RedeemCollateralAmount
  | RedeemCollateralAmountBase
  | RedeemActionSuccess
  | RedeemFailed;
