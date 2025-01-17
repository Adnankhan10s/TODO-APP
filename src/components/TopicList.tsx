"use client"
import { Todo } from "@/models/Todo"
import axios from "axios"
import { FilePenLine, Trash2 } from "lucide-react"
import Link from "next/link"
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
const handleClick = async(id:string)=>{
  const confirmDelete = confirm("Are You Sure You Want to Delete Item");
  if (!confirmDelete) {
    return;
  }
  try {
    await axios.delete(`/api/todo/${id}`);
    setTodos((prevTodos)=>prevTodos.filter((todo)=>todo._id !==id));
    
    
  } catch (error) {
    console.log("Error While Deleting", error)
  }
}
useEffect(() => {
 fetchTodo();
}, [])

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="container grid grid-cols-1 justify-items-center px-10  md:w-full ">
      <h1 className="text-center md:text-4xl text-2xl font-bold text-white/90">Item List</h1>

        {loading ? (<h1 className="font-bold text-2xl pt-5 text-white/80">Loading....</h1>)
        
        :todos.length> 0 ?(
          todos.map((todo:Todo)=>(
<div key={todo._id} className="mt-4 flex justify-between items-center p-5 rounded-md bg-white/30 backdrop-blur-md md:w-full w-[350px]  ">
              <div>
                <h1 className="md:text-4xl text-xl font-bold text-[#1c1c1c]">{todo.title}</h1>
                <p className="mt-2 md:text-xl text-sm font-bold text-blue-950">{todo.description}</p>
                <p className="text-gray-500">{new Date(todo.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex  items-center gap-4 ">
                  <Link href={`/editTodo/${todo._id}`}>
                  <FilePenLine className="text-black hover:text-gray-600 cursor-pointer md:size-10" />
                  </Link>
                  <Trash2 onClick={() => handleClick(todo._id)} className="text-red-600 hover:text-red-400 cursor-pointer md:size-10" />
                  
                </div>
                
            </div>
          ))):(
            <h1 className="font-bold text-xl pt-5 text-white/80">
            No todos found.
          </h1>
          )
        }
            
           
      </div>

    </div>
  )
}

export default TopicList