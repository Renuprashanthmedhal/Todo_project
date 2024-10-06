import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Todos from "./Todos";

function CreateTodo({fetchData,setSuccessMsg,successMsg,todosList}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodoHandler = () => {
    setSuccessMsg("");
    const payload = {
      title,
      description,
    };
    axios
      .post("http://localhost:5000/todo", payload)
      .then((res) => {
        setTitle("");
        setDescription("");
        setSuccessMsg(res.data.message);
        fetchData();
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
    <div className="m-2  flex">
      <div className="m-2 ">
          <label>Title: </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
              setSuccessMsg("");
            }}
            type="text"
            id="title"
            placeholder="Enter the title"
            value={title}
          />
          </div>
          <div className="m-2">
          <label>Description: </label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
              setSuccessMsg("");
            }}
            type="text"
            id="title"
            placeholder="Enter the description"
            value={description}
          />
          </div>
        <button className="rounded" onClick={addTodoHandler}>
          Add Todo
        </button>
    </div>
    <Todos todos={todosList} setSuccessMsg={setSuccessMsg} fetchData={fetchData}/>
    </>
  );
}

export default CreateTodo;
