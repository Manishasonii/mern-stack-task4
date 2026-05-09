import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [task, setTask] = useState("");

  // TASKS WITH CHECKBOX
  const [tasks, setTasks] = useState([
    
  ]);

  const [editIndex, setEditIndex] =
    useState(null);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // ADD TASK
  const addTask = () => {

    if (task === "") {

      alert("Enter Task");

      return;
    }

    // UPDATE TASK
    if (editIndex !== null) {

      const updatedTasks = [...tasks];

      updatedTasks[editIndex].text =
        task;

      setTasks(updatedTasks);

      setEditIndex(null);

    } else {

      // ADD NEW TASK
      setTasks([
        ...tasks,
        {
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  // DELETE TASK
  const deleteTask = (index) => {

    const filtered = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(filtered);
  };

  // EDIT TASK
  const editTask = (index) => {

    setTask(tasks[index].text);

    setEditIndex(index);
  };

  // TOGGLE CHECKBOX
  const toggleTask = (index) => {

    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  return (

    <div className="todo-container">

      <div className="todo-box">

        {/* TOP */}

        <div className="top">

          <h1>MERN Todo App</h1>

          <button
            className="logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* INPUT */}

        <div className="input-box">

          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
          />

          <button
            className="add-btn"
            onClick={addTask}
          >
            {editIndex !== null
              ? "Update"
              : "Add Task"}
          </button>

        </div>

        {/* TASK LIST */}

        {tasks.map((item, index) => (

          <div
            className="task"
            key={index}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >

              <input
                type="checkbox"
                checked={item.completed}
                onChange={() =>
                  toggleTask(index)
                }
              />

              <p
                style={{
                  textDecoration:
                    item.completed
                      ? "line-through"
                      : "none",

                  color:
                    item.completed
                      ? "gray"
                      : "black",
                }}
              >
                {item.text}
              </p>

            </div>

            <div className="buttons">

              <button
                className="edit"
                onClick={() =>
                  editTask(index)
                }
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() =>
                  deleteTask(index)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;