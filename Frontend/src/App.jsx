import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTask] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("Tasks"));
    return storedTasks ? storedTasks : [];
  });
  const URL = "http://localhost:6969/api/v1/tasks";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const [Task, SetTask] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    await axios.get(URL).then((res) => SetTask(res.data.tasks));
    console.log(Task);
  };

  const postTasks = async (input) => {
    const postData = {
      name: input,
    };
    const jsonData = JSON.stringify(postData);

    await axios
      .post(URL, jsonData, config)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const addTask = () => {
    if (input === "") {
      return;
    }
    postTasks(input);

    setInput("");
  };

  const deleteTask = (char) => {
    setTimeout(() => {
      setTask(tasks.filter((el) => el.text !== char));
    }, 200);
  };
  const reset = () => {
    setTask([]);
    localStorage.removeItem("Tasks");
  };

  const strikeThrough = (taskToStrike) => {
    SetTask((prevTasks) =>
      prevTasks.map((task) =>
        task === taskToStrike ? { ...task, completed: !task.completed } : task
      )
    );
    // console.log(taskToStrike._id);

    patchTask(taskToStrike.completed, taskToStrike._id);
  };

  const patchTask = async (completed, id) => {
    const patchData = {
      completed: !completed,
    };
    const jsonData = JSON.stringify(patchData);
    await axios
      .patch(`http://localhost:6969/api/v1/tasks/${id}`, jsonData, config)
      .catch((err) => console.log(err));
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
              <button className="button" onClick={addTask}>
                Add Task
              </button>
              <button className="button" onClick={reset}>
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
            <div className="display" key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => strikeThrough(task)}
              />

              <p id="text1" className={task.completed ? "strike" : ""}>
                {task.name}
              </p>

              <button className="btn" onClick={() => deleteTask(task.text)}>
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
