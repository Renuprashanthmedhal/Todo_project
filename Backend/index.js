const express=require('express');
const cors=require('cors');
const wt=require('jsonwebtoken');
const {createTodo} = require("./types")
const {todoModel} = require("./db")

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hi there")
})

app.post("/todo",async(req,res)=>{
    const reqBody = req.body;
    const validatedBody=createTodo.safeParse(reqBody);
    if(!validatedBody.success){
        res.status(500).json({
            "message":"Please enter valid data."
        });
    }
   await todoModel.create({
    "title": reqBody.title,
    'description': reqBody.description,
    "completed": false
   })
   res.json({"message":"Todo created"})
});

app.get("/todos",async(req,res)=>{
    const allTodosList =await todoModel.find();
    res.json({
        "success":true,
        "allTodosList":allTodosList
    })
})

app.put("/completed",async(req,res)=>{
    const reqBody = req.body;
    await todoModel.updateOne({"_id":reqBody.id},{
    completed: true
    })
    res.json({
        "message":"Update successful"
    })
})

app.use((err,req,res,next)=>{
    console.log(err)
})

app.listen(5000,()=>{
    console.log("sever is running on port 5000");
})
