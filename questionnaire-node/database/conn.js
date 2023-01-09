import mongoose from "mongoose";

export default async function connect(){
    console.log(`Attempting to connect to database uri: ${process.env.ATLAS_URI}...`);
    await mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected √"))
    .catch((err) => {
        console.log(err);
    })
}