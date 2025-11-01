import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import album from './Models/Album.js';
import user from './Models/User.js'


// This command is written to use the env variable inside the server.js
dotenv.config();

const app = express()
// Render is providing use a port, and that is an env variable so the port in which the backend would listen it could be that of render or locally it would be 3000 as already it was.
const port = process.env.PORT || 3000;


// The function used to connect to the Database ( in our case it is  MongoDB Atlas).
// As server.js is our main server that would return the responses corresponding to the API requests, the database should always be connected to it whenever the server is running. Not like seed.js.
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection to mongoDB is successful");
  }
  catch {
    console.log("Connection failed to MongoDB");
    // If we will not exit it will run on the broken server.
    process.exit(1);
  }
};

connectDB();


// Middleware. (This was used to remove the CORS error).
app.use(cors());
// This tells how to read the json file sent from the frontend.
app.use(express.json());
app.use('/songs', express.static('songs'));




// Router Handles.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Now the data getting fetched from the live MongoDB database.
app.get('/albums', async (req, res) => {
  try {
    const albums = await album.find({});
    res.json(albums);
  }
  catch (error) {
    console.log("Error Fetching Albums: ", error.message);
    res.status(500).json({ message: "Failed to Fetch albums" });
  }
});

// Api for registration for the new user.
app.post('/auth/register', async (req, res) => {

  try {
    // Because of the express.json middleware  we could easily grab the information that the user posted.
    const { email, password } = req.body;
    // When user didn't provided either of the 2 or both the 2(Validation condition).
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide the Email and the Password." });
    }

    await user.create({ email, password });

    res.status(201).json({
      status: 'Success',
      message: 'User created successfully',
      userID: user._id
    });

  }
  catch (error) {
    // 11000 is MONGODB's duplicate key error.
    if (error.code == 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    console.error('Registration Error: ', error.message);
    res.status(500).json({ message: 'Server Error during registration' });
  }

});













app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
