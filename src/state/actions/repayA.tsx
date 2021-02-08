import { ActionType } from "../action-types";

interface YouOwe {
  type: ActionType.YOU_OWE;
  payload: string;
}

export type RepayAction = YouOwe;
