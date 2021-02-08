import { ActionType } from "../action-types";

interface ConnectWalletAction {
  type: ActionType.CONNECT_WALLET;
}

interface ConnectWalletSuccessAction {
  type: ActionType.CONNECT_WALLET_SUCCESS;
  payload: string[];
}

interface ConnectWalletErrorAction {
  type: ActionType.CONNECT_WALLET_ERROR;
  payload: string;
}

interface LbRouter {
  type: ActionType.LB_FACTORY;
  payload: string;
}

interface SetPoolAddress {
  type: ActionType.SET_POOL_ADDRESS;
  payload: string[];
}

interface AccountBalance {
  type: ActionType.ACCOUNT_BALANCE;
  payload: string;
}
export type Action =
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction
  | LbRouter
  | SetPoolAddress
  | AccountBalance;
