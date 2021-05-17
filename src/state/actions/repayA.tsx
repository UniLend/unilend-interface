import { ActionType } from "../action-types";

interface YouOwe {
  type: ActionType.YOU_OWE;
  payload: string;
}

interface RepayleRepay {
  type: ActionType.HANDLE_REPAY;
}
interface RepaySuccess {
  type: ActionType.REPAY_SUCCESS;
  payload: boolean;
}

interface _RepayAction {
  type: ActionType.REPAY_ACTION;
}

interface RepayHash {
  type: ActionType.REPAY_HASH;
  payload: any;
}

interface RepayFailed {
  type: ActionType.REPAY_FAILED;
  payload: string;
}
export type RepayAction = YouOwe 
  | RepayleRepay
  | RepaySuccess
  | _RepayAction
  | RepayHash
  | RepayFailed;
