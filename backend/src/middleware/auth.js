import jwt from "jsonwebtoken";

export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized user !" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    if (!decodeToken) {
      return res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
    //creating new access Token
    const accessToken = jwt.sign(
        {id : decodeToken.id },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    );
    res.status(200).json({ accessToken })

  } catch (error) {
    console.log("error in auth middleware", error.message);
    return res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};


// middleware/auth.js


export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Access token missing" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // user is authenticated, proceed
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};

