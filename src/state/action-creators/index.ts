import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";
import axios from "../../axios";

export const createTodo =
  (action: Object) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post("todo.json", action);
      dispatch({
        type: ActionType.CREATE_TODO,
        payload: response,
      });
    } catch (error) {
      return error;
    }
  };

export const readTodo = () => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.get("todo.json");
    dispatch({
      type: ActionType.READ_TODO,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    return console.log(error);
  }
};

export const updateTodo =
  (action: object, id: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.put("todo/" + id + ".json", action);
      dispatch({
        type: ActionType.UPDATE_TODO,
        payload: response,
      });
    } catch (error) {}
  };

export const deleteTodo =
  (action: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.delete("todo/" + action + ".json");
      dispatch({
        type: ActionType.DELETE_TODO,
        payload: action,
      });
    } catch (error) {
      return error;
    }
  };
