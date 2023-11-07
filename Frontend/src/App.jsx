import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [input, setInput] = useState("");
  const [Task, setTask] = useState([]);
  const [changeName, setChangeName] = useState(undefined);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const toggleInput = (e, id) => {
    console.log(e);
    setEditingTaskId(id);
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const inputRef = useRef(null);

  useEffect(() => {
    getFetchData();
  }, [Task]);

  const setLS = () => {
    localStorage.setItem("myData", JSON.stringify(Task));
  };
  setInterval(setLS, 5000);
  const getFetchData = async () => {
    const storedData = JSON.parse(localStorage.getItem("myData"));
    await axios
      .get("http://localhost:6969/api/v1/tasks/get/")
      .then((res) => setTask(res.data.tasks))
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTask(storedData);
      });
  };

  const postTaskData = async (input) => {
    const postData = {
      name: input,
    };
    const jsonData = JSON.stringify(postData);

    await axios
      .post("http://localhost:6969/api/v1/tasks/post/", jsonData, config)
      .then((response) =>
        toast.success("Task Added", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .catch((err) => console.log(err));
  };

  const patchTaskCompletion = async (completed, id) => {
    const patchData = {
      completed: !completed,
    };
    const jsonData = JSON.stringify(patchData);
    await axios
      .patch(`http://localhost:6969/api/v1/tasks/patch/${id}`, jsonData, config)
      .catch((err) => console.log(err));
  };
  const patchTaskName = async (name, id) => {
    const patchData = {
      name: name,
    };
    const jsonData = JSON.stringify(patchData);
    await axios
      .patch(`http://localhost:6969/api/v1/tasks/patch/${id}`, jsonData, config)
      .catch((error) =>
        toast.error("Cannot add null value!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  };
  const deleteTaskData = async (id) => {
    await axios
      .delete(`http://localhost:6969/api/v1/tasks/deleteTask/${id}`)
      .then((response) =>
        toast.error("Delete success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      )
      .catch((err) => console.log(err));
  };

  const deleteCompleted = async (id) => {
    await axios
      .delete(`http://localhost:6969/api/v1/tasks/deleteCompleted/`)
      .then((response) =>
        toast.success("🎉Cleared Completed Tasks", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      )

      .catch((err) => console.log(err));
  };

  const addTask = (event) => {
    event.preventDefault();
    if (input === "") return;

    postTaskData(input);
    setInput("");
  };

  const strikeThrough = (event, taskToStrike) => {
    event.preventDefault();

    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task === taskToStrike ? { ...task, completed: !task.completed } : task
      )
    );
    patchTaskCompletion(taskToStrike.completed, taskToStrike._id);
  };

  const deleteTask = async (event, task) => {
    event.preventDefault();
    await setTimeout(() => {
      deleteTaskData(task._id);
    }, 200);
  };

  const reset = (event) => {
    event.preventDefault();
    deleteCompleted();
  };
  const enterKeyPressed = (event, task) => {
    if (event.key == "Enter") {
      patchTaskName(changeName, task._id);
      toggleInput(event, null);
    }
    if (event.key == "Escape") {
      toggleInput(event, null);
    }
  };
  return (
    <>
      <div className="Container">
        <center>
          <h1>ToDO List</h1>
        </center>

        <form name="form">
          <div className="input-div">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="input"
              placeholder="Write a message"
              ref={inputRef}
            />
            <div>
              <button className="button" onClick={(e) => addTask(e)}>
                Add Task
              </button>
              <button className="button" onClick={(e) => reset(e)}>
                Clear
              </button>
            </div>
          </div>
        </form>

        {Task.length === 0 ? (
          <div className="display" id="text2">
            No tasks Yet
          </div>
        ) : (
          Task.map((task, index) => (
            <div className="display yestask" key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => strikeThrough(e, task)}
              />

              {editingTaskId == task._id ? (
                <>
                  <input
                    key={task}
                    type="text"
                    className="input2"
                    value={changeName}
                    onKeyDown={(e) => enterKeyPressed(e, task)}
                    onChange={(e) => setChangeName(e.target.value)}
                  />
                </>
              ) : (
                <button
                  onClick={(e) => toggleInput(e, task._id)}
                  className="btot"
                >
                  <p id="text1" className={task.completed ? "strike" : ""}>
                    {task.name}
                  </p>
                </button>
              )}
              <button className="btn btn2" onClick={(e) => deleteTask(e, task)}>
                Delete
              </button>
            </div>
          ))
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={1}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default App;
