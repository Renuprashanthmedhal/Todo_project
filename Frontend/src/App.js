import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import axios from "axios";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from "./components/Home";

export default function App() {
  const [todosList,setTodosList] =useState([])
  const [successMsg, setSuccessMsg] = useState("");
  const fetchData=()=>{
    axios.get("http://localhost:5000/todos")
    .then(res=>setTodosList(res.data.allTodosList))
    .catch(e=>console.log(e))
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          { <Route path="/todo" element={<CreateTodo todosList={todosList} fetchData={fetchData} successMsg={successMsg} setSuccessMsg={setSuccessMsg} />}/> }
        </Routes>
      </Router>
  );
}
