import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

function authenticateToken(req, res, next) {

    //Extrct token from Authorization header 
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token == null) {
        return res.status(401).json({ error: "No token provided"});
    }   

    //Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token"});
        req.user = user;
        next();
    });
}

export default authenticateToken;
