"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 

 const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
        const todoData ={
            title,
            description,
         }
         const res = await axios.post('/api/todo',todoData);
         console.log(res.data);
         toast.success("Added Successfully");
         setTitle('');
         setDescription('');
         return console.log(res)

    } catch (error) {
          
      return console.log(error)
    }


 }
  return (
    <div className='w-full h-full'>
     
          <div className='w-full h-[100px] flex items-center '>
        <div className='container  w-[370px] md:w-full mx-auto px-5 rounded bg-gradient-to-l bg-orange-400 via-orange-300 from-orange-200  flex justify-center items-center space-x-5 '>
            <Link href={"/"}>  
            <Image src={"/logo.png"} width={200} height={200}  alt='Logo' className='w-[130px] h-[70px] ' />
            </Link>
        </div>
    </div>
       <div className='container w-[350px] md:w-full mx-auto px-5 md:px-0'>
                <form onSubmit={handleSubmit} className="  grid grid-cols-1 gap-4 pt-10" >
                <ToastContainer />
                <div>
                <Input 
                type='text'
                name='title'
                placeholder='Enter a title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                </div>
                <div>
                <Textarea
                typeof='text'
                name='description' 
                placeholder='Enter a description'
                value={description} 
                onChange={(e)=>setDescription(e.target.value)}
                />
                </div>
                <div >
                <Button type='submit'  variant="green" size="lg" className="w-full text-xl font-bold">Add</Button>
                </div>
                </form>
            </div>

    </div>
  )
}

export default page