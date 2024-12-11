import mongoose from "mongoose";


type ConnectionObject ={
    isConnected ?:Number
}

const connection :ConnectionObject ={}

export async function DbConnect ():Promise<void>{
     if(connection.isConnected){
        console.log("Database Already Connected")
        return;
     }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        connection.isConnected=db.connections[0].readyState;
        console.log("Mongo DB Connected Successfully");
        
    } catch (error) {
        console.log("Mongo DB connection Error",error);
        
    }

}