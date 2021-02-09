import { combineReducers } from "redux";
import configureWalletReducer from "./configureWalletReducer";
import redeemReducer from "./redeemReducer";
import repayReducer from "./repayReducer";

const reducers = combineReducers({
  configureWallet: configureWalletReducer,
  repay: repayReducer,
  redeem: redeemReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
