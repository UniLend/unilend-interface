import { combineReducers } from "redux";
import borrowReducer from "./borrowReducer";
import configureWalletReducer from "./configureWalletReducer";
import lendReducer from "./lendReducer";
import redeemReducer from "./redeemReducer";
import repayReducer from "./repayReducer";
import settingsReducer from "./settingsReducer";

const reducers = combineReducers({
  configureWallet: configureWalletReducer,
  repay: repayReducer,
  redeem: redeemReducer,
  borrow: borrowReducer,
  lend: lendReducer,
  settings: settingsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
