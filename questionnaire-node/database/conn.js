import mongoose from "mongoose";

export default async function connect(){
    console.log(`Attempting to connect to database uri: ${process.env.ATLAS_URI}...`);
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("Database Connected √")
}