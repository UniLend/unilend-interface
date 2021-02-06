import { ActionType } from "../action-types";
import { Action } from "../actions";

interface ConfigureWalletState {
  loading: boolean;
  error: string | null;
  data: string[];
  walletConnected: boolean;
  accounts: string[];
  unilendLbRouter: string;
  assetPoolAddress: string;
  collateralPoolAddress: string;
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
};

const configureWalletReducer = (
  state: ConfigureWalletState = initialState,
  action: Action
): ConfigureWalletState => {
  switch (action.type) {
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, error: null, data: [] };
    case ActionType.CONNECT_WALLET_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        error: null,
        accounts: action.payload,
        walletConnected: true,
      };
    case ActionType.CONNECT_WALLET_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default configureWalletReducer;
