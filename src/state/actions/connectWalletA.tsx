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

interface setSelectedNetworkId {
  type: ActionType.SELECTED_NETWORK_ID;
  networkId: number;
}

interface ActiveNetwork {
  type: ActionType.ACTIVE_NETWORK;
  payload: any;
  networkId: any;
}

interface CurrentProvider {
  type: ActionType.CURRENT_PROVIDER;
  payload: string;
  provider: any;
}

interface walletDisconnect {
  type: ActionType.WALLET_DISCONNECT;
}

export type Action =
  | CurrentProvider
  | walletDisconnect
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction
  | LbRouter
  | SetPoolAddress
  | setSelectedNetworkId
  | ActiveNetwork
  | AccountBalance;
