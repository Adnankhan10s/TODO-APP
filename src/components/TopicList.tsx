"use client"
import { Todo } from "@/models/Todo"
import axios from "axios"
import { FilePenLine, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export interface Todo extends Document{
  _id:string;
  title:string;
  description:string;
  createdAt:Date;
}

const TopicList = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setloading] = useState(true);
  async function fetchTodo (){
try {
      const todos = await axios.get('/api/todo');
       setTodos(todos.data);
       setloading(false);
       return
} catch (error) {
    console.log("Error fetching todos",error)
}    
}

useEffect(() => {
 fetchTodo();
}, [])

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="container  px-10  md:w-full ">
      <h1 className="text-center md:text-4xl text-2xl font-bold text-white/90">Item List</h1>

        {
          todos.map((todo:Todo)=>(
<div key={todo._id} className="mt-4 flex justify-between items-center p-5 rounded-md bg-white/25 backdrop-blur-md md:w-full w-[350px] mx-auto ">
              <div>
                <h1 className="md:text-4xl text-xl font-bold text-[#1c1c1c]">{todo.title}</h1>
                <p className="mt-2 md:text-xl text-sm font-bold text-blue-950">{todo.description}</p>
                <p className="text-gray-500">{new Date(todo.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex  items-center gap-4 ">
                  <FilePenLine className="text-black hover:text-gray-600 cursor-pointer md:size-10" />
                  <Trash2 className="text-red-600 hover:text-red-400 cursor-pointer md:size-10" />
                  
                </div>
                
            </div>
          ))
        }
            
           
      </div>

    </div>
  )
}

export default TopicList