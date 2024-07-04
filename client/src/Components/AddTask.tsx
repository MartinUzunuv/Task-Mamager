import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/addTask.css";

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/addTask", {
        name: localStorage.getItem("name"),
        pass: localStorage.getItem("pass"),
        taskTitle: formData.title,
        taskDescription: formData.description,
      })
      .then((response) => {
        if (response.data === "Name taken") {
          alert("This task already exists");
        } else if (response.data === "False credentials") {
          navigate("/login");
        } else if (response.data === "OK") {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <br></br>
        <input
          className="textInput"
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <br></br>
        <input
          className="textInput"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTask;
