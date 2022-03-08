import { gsap } from "gsap";
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
      const todo = JSON.parse(payload.config.data);

      state.todos.push({ ...todo, todoId: payload.data.name });

      setTimeout(() => {
        gsap.fromTo(
          ".todo" + payload.data.name,
          {
            y: 0,
            scale: 0,
            opacity: 0,
            ease: "easeInOut",
            onComplete() {},
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "easeInOut",
          }
        );
      }, 0);
      return state;
    case ActionType.READ_TODO:
      for (const key in payload) {
        state.todos.push({ ...payload[key], todoId: key });
      }
      return { ...state };
    case ActionType.UPDATE_TODO:
      var a = state.todos.slice();
      const currentTodo = JSON.parse(payload.config.data);
      a.forEach((element, index) => {
        if (element.todoId === payload.data.todoId) {
          a.splice(index, 1, { ...currentTodo });
          state.todos = a;
          // allState.todos.push({ ...todo })
          // console.log(element)
        }
      });
      return state;
    case ActionType.DELETE_TODO:
      gsap.to(".todo" + payload, {
        x: 100,
        opacity: 0,
        scale: 0,
        onComplete() {
          var removeDiv: any = document.querySelector(".todo" + payload);
          removeDiv.remove();
          var removeTodo = state.todos.map((element, id) => {
            if (element.todoId === payload) {
              return state.todos.splice(id, 1);
            }
          });
          console.log(removeTodo);
        },
      });
      return state;
    default:
      return state;
  }
};

export default reducer;
