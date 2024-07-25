import mongoose from "mongoose";

const connectToDatabse = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL)
            .then(console.log("Connected to database"))

    } catch (error) {
        console.log("Error in connecting databse", error)
    }
}


export default connectToDatabse;
