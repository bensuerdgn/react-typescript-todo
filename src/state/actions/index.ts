import { ActionType } from "../action-types";
interface CreateTodoAction {
  type: ActionType.CREATE_TODO;
}

interface ReadTodoAction {
  type: ActionType.READ_TODO;
}

interface UpdateTodoAction {
  type: ActionType.UPDATE_TODO;
}

interface DeleteTodoAction {
  type: ActionType.DELETE_TODO;
}
export type Action =
  | CreateTodoAction
  | ReadTodoAction
  | UpdateTodoAction
  | DeleteTodoAction;
