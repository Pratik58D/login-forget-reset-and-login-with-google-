import express from "express";
import { checkAuth, login, logout, signUp } from "../controller/user.controller.js";
import { authenticate, refreshToken } from "../middleware/auth.js";
import passport from "passport";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.post("/refresh", refreshToken)
router.post("/logout",logout)
router.get("/check-auth",authenticate,checkAuth)
// Google login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


// Google callback route

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user;
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production (with HTTPS)
      sameSite: "lax",
    });

      }
);


export default  router;