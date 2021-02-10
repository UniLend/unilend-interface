import { ActionType } from "../action-types";

interface HandleLend {
  type: ActionType.HANDLE_LEND;
}
// interface HandleLendSuccess {}
// interface HandleLendFailed {}
export type LendAction = HandleLend;
