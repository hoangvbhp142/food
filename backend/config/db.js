import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hoangvbhp142:hoangviettran1402@cluster0.3o3anuc.mongodb.net/food-del')
    .then(() => console.log('DB connected'));
}