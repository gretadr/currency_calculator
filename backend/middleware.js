import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateToken(req, res, next) {

    //Extrct token from Authorization header 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided"})
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid token format"});
    }

    const token = authHeader.split(" ")[1]; 

    //Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token"});
        req.user = user;
        next();
    });
}

export default authenticateToken;
