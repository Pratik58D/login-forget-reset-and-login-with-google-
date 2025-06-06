import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required : true
    },
    email :{
        type :String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userRole :{
        type : String,
        default : "user"
    }
}) 


const  User = mongoose.model("User",UserSchema);

export default User;