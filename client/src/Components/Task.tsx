import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TaskItemProps {
  taskTitle: string;
  taskDescription: string;
  completed: Boolean;
}

const Task: React.FC<TaskItemProps> = ({
  taskTitle,
  taskDescription,
  completed,
}) => {
  const navigate = useNavigate();

  const onDelete = async () => {
    axios
      .post("http://localhost:9000/deleteTask", {
        name: localStorage.getItem("name"),
        pass: localStorage.getItem("pass"),
        taskTitle: taskTitle,
      })
      .then((response) => {
        if (response.data === "OK") {
          window.location.reload();
        } else {
          alert("Something went wrong");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  const onComplete = async () => {
    axios
      .post("http://localhost:9000/completeTask", {
        name: localStorage.getItem("name"),
        pass: localStorage.getItem("pass"),
        taskTitle: taskTitle,
        completed: !completed,
      })
      .then((response) => {
        if (response.data === "OK") {
          window.location.reload();
        } else {
          alert("Something went wrong");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  return (
    <div>
      <h3>{taskTitle || ""}</h3>
      <h6>{taskDescription || ""}</h6>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onComplete}>
        {!completed ? "Complete" : "Restore"}
      </button>
    </div>
  );
};

export default Task;
