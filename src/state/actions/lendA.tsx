import { ActionType } from "../action-types";

interface HandleLend {
  type: ActionType.HANDLE_LEND;
}
interface LendSuccess {
  type: ActionType.LEND_SUCCESS;
  payload: boolean;
}

interface _LendAction {
  type: ActionType.LEND_ACTION;
}

interface LendHash {
  type: ActionType.LEND_HASH;
  payload: any;
}

interface LendFailed {
  type: ActionType.LEND_FAILED;
  payload: string;
}

// interface HandleLendSuccess {}
// interface HandleLendFailed {}
export type LendAction = HandleLend | _LendAction | LendHash | LendFailed |LendSuccess;
