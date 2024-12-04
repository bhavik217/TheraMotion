import mongoose from 'mongoose';
const MONGO_URI = "mongodb+srv://Arnavgupta25:arnav123@cluster0.wxmx8.mongodb.net/theramotion";

export  const connectDB = async () => {
    try{
        await mongoose.connect(`${MONGO_URI}`);
        console.log("Connected to DB");
    }
    catch(err){
        console.log("Failed with Error: ", err);
    }
}