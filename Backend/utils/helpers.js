import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        return res.status(401).send({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Token not provided" });
    }

    try {
        const decodedAuthToken = jwt.verify(token, JWT_SECRET_KEY);
        req.emailFromAuthToken = decodedAuthToken.email;
        console.log("The decodedAuthToken is: ", decodedAuthToken);
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        res.status(401).send({ message: "Invalid or expired token" });
    }
};

export { verifyToken };
