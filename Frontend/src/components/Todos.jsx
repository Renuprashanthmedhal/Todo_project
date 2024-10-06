import axios from "axios";

function Todos({todos,fetchData,setSuccessMsg}) {
  const doneBtnhandler=(id)=>{
    const payload={
      "id":id
    }
    axios.put("http://localhost:5000/completed",payload)
    .then(res=>{
      setSuccessMsg(res.data.message);
      fetchData();
    }).catch(e=>console.log(e))
  }
  return (
    <div>
      {todos?.map(todo=>{
        return (
          <div>
          <br />
          <h4 className="m-2 font-mono">Title: {todo.title}</h4>
          <h5  className="m-2 font-mono">Description: {todo.description}</h5>
          <button className="rounded" onClick={()=>{doneBtnhandler(todo._id)}}>{todo.completed ? "Done" : "Mark as done"}</button>
          <br />
          </div>
        )
      })}
    </div>
  );
}

export default Todos;
