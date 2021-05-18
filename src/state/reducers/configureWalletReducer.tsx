import { ActionType } from "../action-types";
import { Action } from "../actions/connectWalletA";
import web3 from "ethereum/web3";

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
  selectedNetworkId: number;
  activeNetWork: any;
  networkId: any;
  walletProvider: any;
  currentProvider: string;
  connectedWallet: any;
  accountBalanceLoading: boolean;
  fullAccountBalance: string;
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
  selectedNetworkId: localStorage.getItem("activeNetworkId")
    ? parseInt(localStorage.getItem("activeNetworkId") || "1")
    : 1,
  activeNetWork: "",
  networkId: "1",
  walletProvider: (window as any).ethereum,
  currentProvider: web3,
  connectedWallet: localStorage.getItem("walletConnected"),
  accountBalanceLoading: false,
  fullAccountBalance: "",
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
    // case ActionType.CONNECT_WALLET_ERROR:
    //   return { ...state, loading: false, error: action.payload, data: [] };
    case ActionType.LB_FACTORY:
      return { ...state, unilendLbRouter: action.payload };
    case ActionType.SET_POOL_ADDRESS:
      return {
        ...state,
        assetPoolAddress: action.payload[0],
        collateralPoolAddress: action.payload[1],
      };
    case ActionType.CONNECTED_WALLET:
      return { ...state, connectedWallet: action.payload };
    case ActionType.ACCOUNT_BALANCE_ACTION:
      return {
        ...state,
        accountBalanceLoading: true,
      };
    case ActionType.ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        accountBalance: action.payload,
        accountBalanceLoading: false,
        fullAccountBalance: action.fullAccountBalance,
      };
    case ActionType.ACCOUNT_BALANCE_FAILED:
      return {
        ...state,
        accountBalance: "",
        fullAccountBalance: "",
        accountBalanceLoading: false,
      };
    case ActionType.SELECTED_NETWORK_ID:
      localStorage.setItem("activeNetworkId", action.networkId.toString());
      return {
        ...state,
        selectedNetworkId: action.networkId ? action.networkId : 1,
      };
    case ActionType.ACTIVE_NETWORK:
      return {
        ...state,
        activeNetWork: action.payload,
        networkId: action.networkId,
      };
    case ActionType.CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.payload,
        walletProvider: action.provider,
      };
    case ActionType.WALLET_DISCONNECT:
      localStorage.removeItem("walletconnect");
      return {
        ...state,
        loading: false,
        error: null,
        data: [],
        walletConnected: false,
        accounts: [],
        accountBalance: "",
        // userTokenBalance: "",
        // poolTokenBalance: "",
        currentProvider: web3,
        // connectedWallet: "",
        walletProvider: (window as any).ethereum,
      };

    case ActionType.CONNECT_WALLET_ERROR:
      localStorage.removeItem("walletConnected");
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
        walletConnected: false,
        currentProvider: web3,
      };
    default:
      return state;
  }
};

export default configureWalletReducer;
