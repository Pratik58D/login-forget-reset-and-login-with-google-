import express from "express";
import connectDb from "./src/config/db.js";
import userRouter from "./src/route/user.route.js";

const app = express();
const Port = 7000;

app.use(express.json());


app.use("/api/user",userRouter)

app.listen(Port,()=>{
    console.log(`server is running at ${Port}`);
    connectDb();
})





