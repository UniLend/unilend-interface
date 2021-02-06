import { combineReducers } from "redux";
import configureWalletReducer from "./configureWalletReducer";

const reducers = combineReducers({
  configureWallet: configureWalletReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
