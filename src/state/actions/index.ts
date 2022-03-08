import { ActionType } from "../action-types";
interface CreateTodoAction {
  type: ActionType.CREATE_TODO;
  payload: any;
}

interface ReadTodoAction {
  type: ActionType.READ_TODO;
  payload: any;
}

interface UpdateTodoAction {
  type: ActionType.UPDATE_TODO;
  payload: any;
}

interface DeleteTodoAction {
  type: ActionType.DELETE_TODO;
  payload: any;
}
export type Action =
  | CreateTodoAction
  | ReadTodoAction
  | UpdateTodoAction
  | DeleteTodoAction;
