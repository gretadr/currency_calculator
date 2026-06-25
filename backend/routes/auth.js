import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

//Login Endpoint. User authentication and JWT token return
router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {
        //Check if user exists
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
         
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            // console.log(user);

            //Compare inserted password vs hashed password in db
            const isMatch = await bcrypt.compare(password, storedHashedPassword);

            if (isMatch) {
                //Generate JWT token
                const accessToken = jwt.sign({id: user.id, username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"} );
                return res.json({ token: accessToken });
            } else {
                return res.status(401).json({ error: "Invalid credentials. Try again"})
            }
        } else {
            return res.status(401).json({ error: "Invalid credentials. Try again"});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
});

export default router;