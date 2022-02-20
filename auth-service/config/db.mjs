import mongoose from "mongoose";

export default async function connect() {
    const { MONGO_URI } = process.env
    try {
        console.log(MONGO_URI);
        const db = await mongoose.connect(MONGO_URI);
        console.log("successfully connected to db");
        return db;
    } catch(error) {
        console.log("failed to connect to db");
        console.error(error);
        process.exit(1);
    }
}