import { ActionType } from "../action-types";
import { Action } from "../actions";
interface Todo {
  todoId: string;
  todoName: string;
  todoDate: Date;
  todoStatus: string;
  todoPriority: string;
}
interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

const reducer = (state: TodoState = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.CREATE_TODO:
      return state;
    case ActionType.READ_TODO:
      for (const key in payload) {
        state.todos.push({ ...action.payload[key], todoId: key });
      }
      return {...state};
    case ActionType.UPDATE_TODO:
      return state;
    case ActionType.DELETE_TODO:
      return state;
    default:
      return state;
  }
};

export default reducer;
