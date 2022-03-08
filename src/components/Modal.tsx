import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import { createTodo, updateTodo } from "../state/action-creators";

// interface ITodo {
//   todoId: string;
//   todoName: string;
//   todoDate: Date;
//   todoStatus: string;
//   todoPriority: string;
// }

var initialTodo = {
  todoId: "",
  todoName: "",
  todoDate: "",
  todoStatus: "",
  todoPriority: "",
};

interface IProps {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  addButtonStatus: boolean;
  updateButtonStatus: boolean;
  updateId: string;
}
const Modal: React.FC<IProps> = ({
  modalStatus,
  setModalStatus,
  addButtonStatus,
  updateButtonStatus,
  updateId,
}) => {
  const currentTodo = useSelector((state: State) => state.todo);

  //const [todo, setTodo] = useState<ITodo>();
  const [todo, setTodo] = useState(initialTodo);

  useEffect(() => {
    if (modalStatus) {
      currentTodo.todos.forEach((element: any) => {
        if (element.todoId === updateId) {
          setTodo({ ...element });
        }
      });
    }
  }, [modalStatus]);

  const handleChangeInput = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    createTodo(todo);
    setModalStatus(false);
    setTodo(initialTodo);
  };

  const onUpdateTodo = () => {
    todo.todoId = updateId;
    setModalStatus(false);
    updateTodo(todo, updateId);
    setTodo(initialTodo);
  };

  return (
    <div className="">
      {modalStatus && (
        <div className="modal opacity-100 visible pointer-events-auto">
          <div className="modal-box">
            <div className="form-control">
              <label className="label">
                <span className="label-text">To Do Name</span>
              </label>
              <input
                name="todoName"
                value={todo.todoName}
                onChange={(e) => handleChangeInput(e)}
                type="text"
                placeholder="To Do"
                className="input input-primary input-bordered"
              />
            </div>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Set End Date</span>
              </label>
              <input
                name="todoDate"
                value={todo.todoDate}
                onChange={(e) => handleChangeInput(e)}
                type="date"
                placeholder="To Do"
                className="input input-primary input-bordered"
              />
            </div>
            <div className="w-full flex">
              <select
                name="todoStatus"
                // defaultValue={'DEFAULT'}
                value={todo.todoStatus}
                onChange={(e) => handleChangeInput(e)}
                className="select select-bordered select-primary flex-1 max-w-full mr-5"
              >
                {/* <option value="DEFAULT" disabled  >
                            Choose your to do status
                        </option> */}
                <option value="Not Started">Not Started</option>
                <option value="In Review">In Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                name="todoPriority"
                // defaultValue={'DEFAULT'}
                value={todo.todoPriority}
                onChange={(e) => handleChangeInput(e)}
                className="select select-bordered select-primary flex-1  max-w-full"
              >
                {/* <option value="DEFAULT" disabled >
                            Choose your to do priority
                        </option> */}
                <option value="Low Priority">Low Priority</option>
                <option value="Medium Priority">Medium Priority</option>
                <option value="High Priority">High Priority</option>
              </select>
            </div>

            <div className="modal-action">
              {addButtonStatus && (
                <a
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    addTodo();
                  }}
                >
                  Add
                </a>
              )}
              {updateButtonStatus && (
                <a
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onUpdateTodo();
                  }}
                >
                  Update
                </a>
              )}
              <a
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setModalStatus(false);
                  setTodo(initialTodo);
                }}
              >
                Close
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
