import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTask from "../Components/AddTask";
import Logout from "../Components/Logout";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!(localStorage.getItem("name") && localStorage.getItem("pass"))) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:9000/getTasks", {
          name: localStorage.getItem("name"),
          pass: localStorage.getItem("pass"),
        })
        .then((response) => {
          if (response.data.message === "OK") {
            console.log(response.data.tasks)
            setTasks(response.data.tasks);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("There was an error making the request:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Logout />
      <AddTask />
      {tasks.map((task: { taskTitle: String; taskDescription: String }, i) => {
        return (
          <div key={i}>
            <h3>{task.taskTitle || ""}</h3>
            <h6>{task.taskDescription || ""}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
