// This is a separate script just to seed our database with our albums data.
// This is a one time run program that is just used to seed the database, it will connect -> seed -> Disconnect.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Album from './Models/Album.js'; 
import albumsdata from './data.js';

// This command is written to use the env variable inside the seed.js
dotenv.config();

const seedDatabase = async()=> {
    try{
        // 1. Connecting to the MONGODB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("The database has been connected successfully...");

        // 2. Clear the exisiting data.
        console.log("Deleting exisiting data ...");
        await Album.deleteMany({});
        console.log("The exisiting data has been deleted successfully..");

        // 3. Inserting (Seeding) the new data.
        console.log("Seeding the new Data....");
        await Album.insertMany(albumsdata);
        console.log("New data has been Seeded successfully...");
    }
    catch(error){
        console.error("Seeding of data process Failed due to: ", error.message);;
    }
    finally{
        await mongoose.connection.close();
        console.log("MongoDB Disconnected...");
        process.exit(0);
    }
};

seedDatabase();
