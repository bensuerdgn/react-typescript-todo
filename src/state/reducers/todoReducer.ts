import { ActionType } from "../action-types";

interface TodoState {
  todo:{
    todoId: string;
    todoName: string;
    todoDate: Date;
    todoStatus: string;
    todoPriority: string;
  }[]|undefined;
}

const initialState: TodoState = {
  todo: [],
};

const reducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.CREATE_TODO:
      return;
    case ActionType.READ_TODO:
      return { ...state, todo: { ...payload } };
    case ActionType.UPDATE_TODO:
      return;
    case ActionType.DELETE_TODO:
      return;
    default:
      return state;
  }
};

export default reducer;
