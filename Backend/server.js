import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Album from './Models/Album.js'; // Fixed: Capitalized Model Name
import User from './Models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import cloudinary from './cloudinary.js';
import upload from './multer.js';
import authenticatetoken from './middleware/auth.js';

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
app.get('/albums', authenticatetoken, async (req, res) => {
  try {
    // Fixed: Used Capitalized Album model
    const albums = await Album.find({user: req.user.userid});
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

    const newuser = await User.create({ email, password });

    res.status(201).json({
      status: 'Success',
      message: 'User created successfully',
      userID: newuser._id
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


// api for the login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide Email and the password' });
    }

    const userdetails = await User.findOne({ email: email });

    if (userdetails == null) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    // we have to compare the password that user has entered in this api route from req.body to the already present password in the database corresponding to the searched email.
    const hashedpassword = userdetails.password;
    const isMatch = await bcrypt.compare(password, hashedpassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'password do not match' });
    }

    // using JWT to assign the token to the specific users
    const token = jwt.sign(
      // payload: Data we want to insert into the token.
      {
        userid: userdetails._id,
        email: userdetails.email
      },

      // secret key
      process.env.JWT_SECRET,

      // this is for the security purpose, that user can login only for the one day, then automatically logout.
      { expiresIn: '1d' }
    );

    // if we are here that means success
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: userdetails._id,
        email: userdetails.email
      }
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

// This API end point is for getting the song from the browser, uploading it to the cloudinary, then obtaining the link from cloudinary and uploading it to the MongoDB.

// 1.MiddleWare: using upload.single('song'), means that the song will be uploaded on the storage that we have defined in the multer with the limit also, the storage is the RAM in which the file will be their for some milliseconds before going to the cloudinary

// we have updated our middlware as upload.files(), because we want to upload both the song as well as the image file.

// Summary of the Flow
// Here is the life of your request now:

// Request Arrives: User sends MP3 + Token.

// Hit auth.js (The Guard):

// Checks Token. Valid? Yes.

// Decodes Token (verified).

// Stamps Clipboard: req.user = { userId: ... }.

// Yells: next() ("Open the gate!").

// Hit /upload-song (The Room):

// Receives the Clipboard (req).

// Uploads file to Cloudinary.

// Needs to save to DB. Who is the owner?

// Looks at Clipboard: req.user.userId. (Ah! It's Chetan!).

// Saves Album with user: req.user.userId.

// Sends Response (res.json). The End.


app.post('/upload-song', authenticatetoken, upload.fields([{ name: 'song', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), async (req, res) => {
  try {
    // Either both the files are not uploaded or just the song file is not uploaded(cover is optional).
    if (!req.files || !req.files['song']) {
      return res.status(200).json({
        message: 'Please upload the file first.'
      });
    }

    // defining the song and cover images separately
    const songupload = req.files['song'][0];
    const coverupload = req.files['cover'] ? req.files['cover'][0] : null;




    // if the file is uploaded then we have to make sure to send it to the cloudinary and get the link.

    // the uploadstream: is like making a pipe between the bucket of water end to the swimming pool end

    // wrapping it in a promise has a reason that till the time the water is not completely filled at pool or we get any signal from the swimming pool guard that will be our response, we will be keep going.
    const cloudinaryUpload = new Promise((resolve, reject) => {
      const uploadstream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          // folder is optional, we have done to store the songs in a specific foldder.
          folder: "tunesta-songs"
        },

        (error, result) => {
          if (error) {
            reject(error)
          }
          else {
            resolve(result);
          }
        }
      );

      // This means adding the water to the pipe through the bucket of water.
      // here since we have used the memorystorage in the multer, therefore the file is stored in the buffer.
      uploadstream.end(songupload.buffer);

    });

    // we wrapped the uploadstream function in to a promise just because to use the await here, because uploading to cloudinary follows a traditional JS approach in which the callback hell is the major problem, so to make sure that does not happen, we have wrapped it in to a promise.
    const cloudinaryResult = await cloudinaryUpload;


    // Since coverimage uploading is optional so we have to give a default cover url also.
    let coverurl = "https://res.cloudinary.com/dqkknf9vy/image/upload/v1765177467/default_cover_ppixnk.jpg";

    if (coverupload) {
      // Here we have to upload the image to cloudinary also, so BRUTE FORCE: writting the promise for image.

      const imagecloudinaryupload = new Promise((resolve, reject) => {
        // 1. We setted up the bridge.
        const imageuploadstream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "tunesta_coverimages"
          },

          (error, result) => {
            if (error) {
              reject(error);
            }
            else {
              resolve(result);
            }
          }
        );

        // here in the req.file.buffer cannot just give both the things the song and image with it's own mind so we have to define them separately, that i will do few lines above.
        imageuploadstream.end(coverupload.buffer);
      });

      const imagecloudinaryresult = await imagecloudinaryupload;
      coverurl=imagecloudinaryresult.secure_url;
    }



    // here cloudinary result will be containing the result of the promise like the filetype, URL etc.
    // therfore either we will make the separate song model or will use the exisiting album model to
    // enter the song cloudinary URL in mongoDB

    // We are using the exisiting album model in which the song schema is already wrapped.

    const songData =
    {
      name: req.body.albumname || songupload.originalname,
      path: cloudinaryResult.secure_url
    }

    // The user will provide the albumTitle if he wants to upload in to the exisiting album
    let albumTitle = req.body.albumTitle || "Untitled Album";

    // finding that albumtitle to the corresponding user in the mongodb database.
    // Fixed: Added await and used Capitalized Album model and corrected userid spelling
    let album1 = await Album.findOne({
      title: albumTitle,
      user: req.user.userid
    })

    // checking if album1 already exists, if yes then song will be added to it, otherwise new album will be created.
    if (album1) {
      console.log("Founded exisiting album.... uploading the song to it")
      album1.songs.push(songData);
      await album1.save();

      res.status(200).json({ message: "Song added to the exisiting album", album1 })
    }
    else {
      console.log("Album not found... Creating new one.")
      // Fixed: Used Capitalized Album model and corrected userid spelling
      const newAlbum = await Album.create(
        {
          user: req.user.userid,
          folder: albumTitle,
          title: req.body.albumTitle || songData.name,
          description: req.body.description || "Recently Created by the User",
          cover: coverurl,
          songs: [songData]
        })

      return res.status(201).json({ message: "Song uploaded and Album Created Successfully" })
    }
  }

  catch (e) {
    console.log("Error encountered while uploading the song and creating the album as ", e);
    return res.status(500).json({ message: "Internal Server Error" })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  