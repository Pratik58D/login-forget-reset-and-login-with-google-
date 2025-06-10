import express from "express";
import connectDb from "./src/config/db.js";
import userRouter from "./src/route/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import "./src/config/passport.js"
import env from "dotenv";




env.config();
const app = express();
const Port = 7000;

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173" , 
    credentials : true
}))

// sign in with google
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/user",userRouter)

app.listen(Port,()=>{
    console.log(`server is running at ${Port}`);
    connectDb();
})





