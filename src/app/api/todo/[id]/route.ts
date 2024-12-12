import { DbConnect } from "@/libs/dbConfig";
import { Todo } from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
  await DbConnect();
  const id = await params.id
  const {title , description} = await req.json();
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id,
      { title, description},
      { new: true }  );
    return NextResponse.json(updatedTodo,{status:201})
  } catch (error) {
     return NextResponse.json({message:"Failed to update"},{status:402})
  }
  
}
export async function GET(request: NextRequest, { params }:any) {
  try {
    const id = await params.id;
    await DbConnect();
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching todo" }, { status: 500 });
  }
}
export async function DELETE(req:NextRequest,{params}:any) {
  await DbConnect();
  
  try {
    await Todo.findByIdAndDelete(params.id)
    return NextResponse.json({message:"Deleted successfully"},{status:402})
  } catch (error) {
    
  }
  
}

// export async function PUT(req:NextRequest , {params}:{params:{id:string}}) {
//     try {
//         const {id} = params;
//         const{title , description}= await req.json();
//         DbConnect();
//         const updatedTodo = await Todo.findByIdAndUpdate(id ,{title , description},{new:true});
//         return NextResponse.json({message:"Todo Updated Succesfully",updatedTodo},{status:201})
//     } catch (error) {
//         return NextResponse.json({message:"Error occure during Updating"},{status:401})
//     }
// }
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//       const { id } = params;
//       console.log("Received ID:", id);  // Log the received ID for debugging
//       DbConnect();
//       const todo = await Todo.findById(id);
//       if (!todo) {
//         console.log("Todo not found");  // Log if no todo is found
//         return NextResponse.json({ message: "Todo not found" }, { status: 404 });
//       }
//       return NextResponse.json(todo, { status: 200 });
//     } catch (error) {
//       console.error("Error in GET API:", error);
//       return NextResponse.json({ message: "Error occurred during fetching" }, { status: 500 });
//     }
//   }
  
  
