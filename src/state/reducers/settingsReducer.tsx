import { Reciepent } from "ethereum/contracts";
import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";
import icon from "assets/dropdown.svg";


interface SettingsState {
  theme: string;
  activeCurrency: any;
}

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  activeCurrency: {
    name: "Select Token",
    logoURI: icon,
    chainId: 1,
    symbol: "Select Token",
    address: Reciepent,
    decimals: 18,
  },
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case ActionType.CURRENT_THEME:
      return { ...state, theme: action.payload };
    case ActionType.ACTIVE_CURRENCY:
      return { ...state, activeCurrency: action.payload };
    default:
      return state;
  }
};
export default settingsReducer;
