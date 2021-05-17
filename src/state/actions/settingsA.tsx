import { ActionType } from "../action-types";

interface Theme {
  type: ActionType.CURRENT_THEME;
  payload: string;
}


interface ActiveCurrency {
  type: string;
  payload: any;
}

export type SettingAction = Theme | ActiveCurrency;
