import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { bindActionCreators } from "redux";
//var todos = [{name:"bensu"}]

const Todo: React.FC = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [updateButtonStatus, setUpdateButtonStatus] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { readTodo, deleteTodo } = bindActionCreators(actionCreators, dispatch);
  const currentTodo = useSelector((state: State) => state.todo);

  useEffect(() => {
    readTodo();
    console.log(currentTodo);
    console.log();
  }, []);

  const onDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  const onUpdateTodo = (todoId: string) => {
    setUpdateId(todoId);
  };

  const filtered = currentTodo.todos.filter((item: any) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  const getStatusClass = (item: string) => {
    return item === "Not Started"
      ? "bg-error"
      : item === "In Review"
      ? "bg-warning"
      : item === "In Progress"
      ? "bg-info"
      : item === "Completed"
      ? "bg-success"
      : "bg-black";
  };

  const getPriorityClass = (item: string) => {
    return item == "High Priority"
      ? "text-error"
      : item == "Medium Priority"
      ? "text-info"
      : item == "Low Priority"
      ? "text-success"
      : "text-black";
  };

  return (
    <div className="">
      <div className="content">
        <div className="header flex flex-col items-center py-5 border-b-2 border-white shadow-md w-full">
          <h1 className="uppercase font-semibold text-3xl text-primary mb-5">
            To Do List Board
          </h1>
          <div className="form-control">
            <div className="flex space-x-2 w-64">
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full input input-primary input-bordered h-10 rounded-box"
              />
            </div>
          </div>
        </div>
        <div className="board bg-gray-100 mx-auto my-10 p-5 relative z-10 max-w-4xl rounded-box shadow-2xl">
          <div className="toDoList flex items-center justify-between my-6 font-medium text-lg">
            <div className="title">To Do</div>
            <div className="list flex items-center">
              <div className="date w-32">End date</div>
              <div className="status w-24">Status</div>
              <div className="priority w-28">Priority</div>
            </div>
          </div>
          <div className=" add-ToDo my-2 p-2 text-left border-primary border-dashed border-2 rounded-box">
            <a
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setModalStatus(true);
                setAddButtonStatus(true);
                setUpdateButtonStatus(false);
                setUpdateId("");
              }}
            >
              <i className="fas fa-plus text-primary"> Add New To Do </i>
            </a>
          </div>
          <div className="todos">
            {filtered.map((todo: object, index: number) => (
              <div className={"todo" + filtered[index].todoId} key={index}>
                <div className=" toDo flex items-center justify-between my-2 bg-white rounded-box p-2 border-border border hover:shadow-md">
                  <div className="title">
                    {filtered[index].todoName}{" "}
                    {/*<span>id : {filtered[index].todoId} </span>*/}{" "}
                  </div>
                  <div className="list flex items-center">
                    <div className="date w-28">{filtered[index].todoDate}</div>
                    <div
                      className={`status w-28 py-2 text-white rounded-box text-center 
                                            ${getStatusClass(
                                              filtered[index].todoStatus
                                            )}`}
                    >
                      {filtered[index].todoStatus
                        ? filtered[index].todoStatus
                        : "No Status"}
                    </div>
                    <div className="priority w-24 text-center">
                      <i
                        className={`fab fa-font-awesome-flag text-lg border-border border-2 w-8 h-8 rounded-full ${getPriorityClass(
                          filtered[index].todoPriority
                        )}`}
                      ></i>
                    </div>
                    <div className="option">
                      <div className="dropdown dropdown-left">
                        <div tabIndex={0} className="m-1">
                          <i className="fas fa-ellipsis-v text-gray-600 cursor-pointer p-1"></i>
                        </div>
                        <ul
                          tabIndex={0}
                          className="shadow menu dropdown-content bg-base-100 rounded-box w-24 "
                        >
                          <li>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                setModalStatus(true);
                                setUpdateButtonStatus(true);
                                setAddButtonStatus(false);
                                onUpdateTodo(filtered[index].todoId);
                              }}
                            >
                              Update
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                onDeleteTodo(filtered[index].todoId);
                              }}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        addButtonStatus={addButtonStatus}
        updateButtonStatus={updateButtonStatus}
        updateId={updateId}
      />
    </div>
  );
};

export default Todo;
