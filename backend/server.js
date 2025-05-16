import express from "express";
import connectDb from "./src/config/db.js";
import userRouter from "./src/route/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const Port = 7000;

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173" , 
    credentials : true
}))


app.use("/api/user",userRouter)

app.listen(Port,()=>{
    console.log(`server is running at ${Port}`);
    connectDb();
})





