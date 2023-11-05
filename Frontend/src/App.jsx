import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [Task, setTask] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getFetchData();
  });
  useEffect(() => {
    getFetchData();
  }, [Task]);

  const getFetchData = async () => {
    await axios
      .get("http://localhost:6969/api/v1/tasks/get/")
      .then((res) => setTask(res.data.tasks));
  };

  const postTaskData = async (input) => {
    const postData = {
      name: input,
    };
    const jsonData = JSON.stringify(postData);

    await axios
      .post("http://localhost:6969/api/v1/tasks/post/", jsonData, config)
      .then((response) => console.log(response))
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
  const deleteTaskData = async (id) => {
    await axios
      .delete(`http://localhost:6969/api/v1/tasks/deleteTask/${id}`)
      .catch((err) => console.log(err));
  };

  const deleteCompleted = async (id) => {
    await axios
      .delete(`http://localhost:6969/api/v1/tasks/deleteCompleted/`)
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
              onChange={(val) => setInput(val.target.value)}
              className="input"
              placeholder="Write a message"
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
          Task.map((task) => (
            <div className="display yestask" key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => strikeThrough(e, task)}
              />

              <p id="text1" className={task.completed ? "strike" : ""}>
                {task.name}
              </p>

              <button className="btn" onClick={(e) => deleteTask(e, task)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default App;
