import mongoose from "mongoose";

const UserModel = mongoose.model("User", new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password_hash: { type: String },
    salt: {type: String}
}));

export default UserModel;