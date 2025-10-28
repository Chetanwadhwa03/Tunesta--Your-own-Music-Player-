import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

const connectDB = async() => {
  try{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection to mongoDB is successful");
  }
  catch{
    console.log("Connection failed to MongoDB");
    process.exit(1);
  }
};

connectDB();


// Middleware. (This was used to remove the CORS error).
app.use(cors());

app.use('/songs',express.static('songs'));



// Hardcoded Data - Manifest.json
const tunestadata = {
  "albums": [
    {
      "folder": "Ammy Virk",
      "title": "Ammy Virk",
      "description": "Enjoy the Punjabi Energetics!",
      "cover": "/songs/Ammy Virk/cover.jpg",
      "songs": [{ "name": "Qismat", "path": "/songs/Ammy Virk/Qismat Ammy Virk.mp3" },
        { "name": "Saade Kothe Utte", "path": "/songs/Ammy Virk/Saade Kothe Utte Ammy Virk.mp3" }
      ]
    },
    {
      "folder": "Arijit Singh",
      "title": "Arijit Singh",
      "description": "Melodies from Arijit",
      "cover": "/songs/Arijit Singh/cover.jpg",
      "songs": [
        { "name": "Apna bana le piya", "path": "/songs/Arijit Singh/Apna bana le piya.mp3" },
        { "name": "Tainu Khabar Nahi", "path": "/songs/Arijit Singh/Tainu Khabar Nahi - Arijit Singh.mp3" },
        { "name": "Zaalima", "path": "/songs/Arijit Singh/Zaalima Raees-Arijit Singh.mp3" }
      ]
    },
    {
      "folder": "Atif Aslam",
      "title": "Atif Aslam",
      "description": "Atif for you!",
      "cover": "/songs/Atif Aslam/cover.jpg",
      "songs": [
        { "name": "Khwab", "path": "/songs/Atif Aslam/Khwab Official.mp3" },
        { "name": "Tera Hone Laga Hoon", "path": "/songs/Atif Aslam/Tera Hone Laga Hoon Lyrical.mp3" }
      ]
    },
    {
      "folder": "bgm",
      "title": "Background Music",
      "description": "Enjoy the Music",
      "cover": "/songs/bgm/cover.jpg",
      "songs": [
        { "name": "Aspire Motivation", "path": "/songs/bgm/Aspire Motivation full song.mp3" },
          { "name": "Glo Fi - Windows of Ken", "path": "/songs/bgm/Glo Fi - Windows of Ken.mp3" }
      ]
    },
    {
      "folder": "romanticsongs",
      "title": "Romantic Songs",
      "description": "Enjoy the Music",
      "cover": "/songs/romanticsongs/cover.jpg",
      "songs": [
        { "name": "Baarish", "path": "/songs/romanticsongs/Baarish  full song.mp3" },
          { "name": "Jogi", "path": "/songs/romanticsongs/Jogi full song.mp3" },
          { "name": "Lag Ja Gale", "path": "/songs/romanticsongs/Lag Ja Gale Full song.mp3" },
          { "name": "Nazm Nazm", "path": "/songs/romanticsongs/Nazm Nazm full song.mp3" },
          { "name": "Thodi Der", "path": "/songs/romanticsongs/Thodi Der full song.mp3" }
      ]
    },
    {
      "folder": "Satinder Sartaj",
      "title": "Satinder Sartaj",
      "description": "Enjoy the Punjabi Melodies",
      "cover": "/songs/Satinder Sartaj/cover.jpg",
      "songs": [
        { "name": "Tere Bina Na Guzara", "path": "/songs/Satinder Sartaj/Tere Bina Na Guzara Full Song Satinder Sartaaj.mp3" },
          { "name": "Udaarian", "path": "/songs/Satinder Sartaj/Udaarian-Satinder Sartaaj.mp3" }
      ]
    }
  ]
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/albums', (req, res) => {
  res.json(tunestadata.albums)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
