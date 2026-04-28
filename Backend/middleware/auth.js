import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticatetoken = (req, res, next) => {
    // 1. taking the the header from the frontend
    // it sends something like beared ghdjklwb...

    console.log('Here i am to verify the authorization part ');
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
       
    if (!token || token === 'undefined' || token === "null") {
        return res.status(401).json({ 
            success:false,
            message: "Authentication failed." 
        })
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
            console.log(e.message)
            return res.status(500).json({ message: "Invalid Token" });
        }
    }
}
export default authenticatetoken;