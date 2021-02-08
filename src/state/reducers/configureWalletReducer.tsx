import { ActionType } from "../action-types";
import { Action } from "../actions/connectWalletA";

interface ConfigureWalletState {
  loading: boolean;
  error: string | null;
  data: string[];
  walletConnected: boolean;
  accounts: string[];
  unilendLbRouter: string;
  assetPoolAddress: string;
  collateralPoolAddress: string;
  accountBalance: string;
}

const initialState = {
  walletConnected: false,
  accounts: [],
  unilendLbRouter: "",
  assetPoolAddress: "",
  collateralPoolAddress: "",
  loading: false,
  error: null,
  data: [],
  accountBalance: "",
};

const configureWalletReducer = (
  state: ConfigureWalletState = initialState,
  action: Action
): ConfigureWalletState => {
  switch (action.type) {
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, error: null, data: [] };
    case ActionType.CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accounts: action.payload,
        walletConnected: true,
      };
    case ActionType.CONNECT_WALLET_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] };
    case ActionType.LB_FACTORY:
      return { ...state, unilendLbRouter: action.payload };
    case ActionType.SET_POOL_ADDRESS:
      return {
        ...state,
        assetPoolAddress: action.payload[0],
        collateralPoolAddress: action.payload[1],
      };
    case ActionType.ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalance: action.payload,
      };
    default:
      return state;
  }
};

export default configureWalletReducer;
