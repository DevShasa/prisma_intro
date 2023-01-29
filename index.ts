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

app.post("/createcar",async(req:Request, res:Response)=>{
    const { model, year, userId } = req.body
    const car = await prisma.car.create({
        data:{
            model:model,
            year:year,
            userId: userId
        }
    })
    res.json(car)
})

app.get("/", async(req:Request, res:Response)=>{
    const users = await prisma.user.findMany({include:{cars:true}});
    res.json(users);
}); 

app.get("/fetchUserbyId/:id", async(req:Request, res:Response)=>{
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where:{id:Number(id)}
    })
    res.json(user)
})



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


// does not work with sqlite
// app.post("/createManyUsers", async(req:Request, res:Response)=>{
//     const { userList } = req.body
//     const users = await prisma.user.createMany({
//         data:userList
//     })
//     res.json(users);
// })

app.listen(3001,()=>{
    console.log("THE SERVER IS LISTENING @3001 WADDUP")
})