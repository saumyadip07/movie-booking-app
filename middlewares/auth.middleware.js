//packages
import jwt from "jsonwebtoken";
//utils
import { STATUS_CODES } from "../utils/constants.js";


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(STATUS_CODES.UNAUTHORISED).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(STATUS_CODES.UNAUTHORISED).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(STATUS_CODES.UNAUTHORISED).json({ message: "Invalid token" });
    }

    // Fallback for any other error
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Authentication failed" });
  }
};

export default authCheck;
