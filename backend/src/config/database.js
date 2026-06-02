const mongoose=require("mongoose");

const DB_URL=process.env.DB_URL
// mongoose.connect("mongodb+srv://bijoy_db:Bijoy@mongodb@cluster0.l6kl9ia.mongodb.net/")

const connectDB= async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);

    }}


module.exports=connectDB;
    