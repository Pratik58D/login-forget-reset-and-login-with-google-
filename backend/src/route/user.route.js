import express from "express";
import { checkAuth, login, logout, signUp } from "../controller/user.controller.js";
import { authenticate, refreshToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.post("/refresh", refreshToken)
router.post("/logout",logout)
router.get("/check-auth",authenticate,checkAuth)


export default  router;