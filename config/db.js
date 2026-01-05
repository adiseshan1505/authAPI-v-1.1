import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected");
    } catch (err) {
        console.log("Connection error: ", err);
        process.exit(1);
    }
}

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

export const UserModel = mongoose.model('users', UserSchema);
export { connectDB };