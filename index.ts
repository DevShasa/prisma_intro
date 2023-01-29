import express, {Request, Response} from "express";
import {  PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req:Request, res:Response)=>{
    const {username, password} = req.body;
    const user = await prisma.user.create({
        data:{
            username:username,
            password:password, 
        },
    });
    res.json(user); // return the created user
}); 

app.get("/", async(req:Request, res:Response)=>{
    const users = await prisma.user.findMany(); // return everything inside the user table
    res.json(users);
}); 

app.put("/", async(req:Request, res:Response)=>{
    const { id, username } = req.body
    const updatedUser = await prisma.user.update({
        where:{id:id},
        data:{username:username},
    });
    res.json(updatedUser)
}); 

app.delete("/:id", async(req:Request, res:Response)=>{
    const id = Number(req.params.id);
    const deletedUser = await prisma.user.delete({
        where:{id:id},
    })
    res.json({message:`user ${id} has been deleted`})
}); 

app.listen(3001,()=>{
    console.log("THE SERVER IS LISTENING @3001 WADDUP")
})