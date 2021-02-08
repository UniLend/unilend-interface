import { combineReducers } from "redux";
import configureWalletReducer from "./configureWalletReducer";
import repayReducer from "./repayReducer";

const reducers = combineReducers({
  configureWallet: configureWalletReducer,
  repay: repayReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
