import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, userRole } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ error: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "email is already taken" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName,
      password: hashedPassword,
      email,
      userRole,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.error("error in signUp Controller", error.message);
    return res.status(500).json({
      message: "server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    //creating access token (expires in 15 minutes)
    const accessToken = jwt.sign(
      {id :user._id , role : user.userRole},
      process.env.JWT_SECRET,
      {expiresIn : "15m"}
    );

    //creating refresh token (expires in 7 minutes)
    const refreshToken = jwt.sign(
      {id: user._id},
      process.env.JWT_REFRESH_KEY,
      {expiresIn : "7d"}
    );

    res.cookie("refreshToken",refreshToken,{
      httpOnly: true,
      secure: false, 
      sameSite : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      success: true,
      message : "successfully login",
      accessToken,
      user :{
        userName : user.userName,
        email : user.email,
        role : user.userRole
      }
    });
  } catch (error) {
    console.error("error in login Controller", error.message);
    res.status(500).json({
      message: "server Error",
      success: false,
    });
  }
};


export const logout = async (req,res) =>{
  try {

    res.clearCookie("refreshToken",{
      httpOnly: true,
      secure : false,
      sameSite : "Strict"
    });

    return res.status(200).json({
      success : true,
      message :"logout out sucessful"
    })

    
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
    
  }
}


export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    })
  } catch (error) {
    console.log("error in auth controller", error.message);
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};