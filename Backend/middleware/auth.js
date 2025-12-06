// This file has been made to use this as a middleware whereever we want to get the token in the decrypted form, when a user login, we get a JWT but to add it to the mongoDB to the specific album to make sure the user see's only his album we have made this so that album could be linked to the user.

// It is a guard at the club, checking the user id, and allows you to enter, then you can go to any of the room like upload song or delete song. You dont need the separate verification of the user everywhere .

// Parallel to the verification it is attaching the user information to the clipboard so the next function can eaisly use it




import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticatetoken = (req, res, next) => {
    // 1. taking the the header from the frontend
    // it sends something like beared ghdjklwb...

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mesaage: "Authentication failed." })
    }
    else {
        try {
            // decrypted the token using the secret key that we had
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            // uploading the decrypted user authentication information to the req.user so that further functions could use it.
            req.user = verified;
            
            next();
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Invalid Token" });
        }
    }
}
export default authenticatetoken;