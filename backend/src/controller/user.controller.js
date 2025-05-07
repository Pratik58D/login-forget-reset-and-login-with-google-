import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUp = async(req, res) => {

  try {
  const { userName, email, password, userRole } = req.body;
    if (!userName || !email || !password) {
      res.status(400).json({
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
    };
    if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      };

      const salt =  await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      const user = new User({
        userName,
        password  : hashedPassword,
        email,
        userRole

      })

      await user.save();

      res.status(200).json({
        success : true ,
        message : "user created successfully"
      })

  } catch (error) {
    console.error("error in signUp Controller", error.message);
    res.status(500).json({
      message: "server Error",
      success: false,
    });
  }
};

export const login = async(req, res) => {
  try {
    const {userName , password} = req.body;
    if(!userName || !password){
      return res.status(400).json({
        success : false,
        message : "All field are required"
      })
    };
    const user = await User.findOne({userName});
    if(!user) {
      return res.status(401).json({
        success : false,
        message: "Invalid user"
      })
    } 
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
      return res.status(401).json({
        success : false,
        message : "Invalid password"
        })
    };

    res.status(200).json({
      success : true,
      message : "sucessfully login"
    })



  } catch (error) {
    console.error("error in login Controller", error.message);
    res.status(500).json({
      message: "server Error",
      success: false,
    });
  }
};
